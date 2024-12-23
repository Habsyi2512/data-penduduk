<?php

namespace App\Models;

use Carbon\Carbon;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DataPenduduk extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $table = 'data_penduduks';
    protected $primaryKey = 'nik';
    public $incrementing = false;     // Karena no_kk bukan auto increment
    protected $keyType = 'string';
    protected $fillable = ['nik', 'nama', 'tempat_lahir', 'tanggal_lahir', 'no_kk', 'kelamin_id', 'agama_id', 'pekerjaan_id', 'gol_darah_id', 'status_kawin_id', 'kewarganegaraan_id', 'status_hubungan_id'];
    protected $with = ['agama', 'jenis_kelamin', 'pekerjaan', 'gol_darah', 'status_kawin', 'kewarganegaraan', 'KK', 'status_hubungan_keluarga'];

    public static function generateNIK($district, $date, $no_kk)
    {
        try {
            // Kode wilayah berdasarkan inputan
            $tanggal_lahir = Carbon::createFromFormat('Y-m-d', $date);
            $data_kk = MasterKK::where('no_kk', '=', $no_kk)->first();
        
            // Ambil tanggal, bulan, dan tahun dari tanggal lahir
            $tanggal = $tanggal_lahir->format('d'); // Tanggal (DD)
            $bulan = $tanggal_lahir->format('m');   // Bulan (MM)
            $tahun = $tanggal_lahir->format('y');   // Tahun (YY)
        
            $max_attempts = 10; // Batas maksimal percobaan
            $attempts = 0;
            $nik = null;
    
            do {
                // Nomor urut penerbitan KK dengan angka acak antara 1000 dan 9999
                $random_number = mt_rand(1000, 9999);
            
                // Gabungkan bagian-bagian untuk membentuk NIK
                $nik =  substr($district, 0, 6) . $tanggal . $bulan . $tahun . $random_number;
            
                // Cek apakah NIK sudah ada di database
                $existingNIK = DataPenduduk::where('nik', 'like', substr($nik, 0, 12) . '%')
                    ->first();
    
                if ($existingNIK) {
                    // Jika ada duplikasi, ubah digit pertama dari tanggal
                    $tanggal = str_pad((intval(substr($tanggal, 0, 1)) + 1) . substr($tanggal, 1), 2, '0', STR_PAD_LEFT);
                }
    
                $attempts++;
            } while ($existingNIK && $attempts < $max_attempts);
    
            // Jika mencapai batas percobaan, kembalikan error
            if ($attempts >= $max_attempts) {
                throw new \Exception('Gagal menghasilkan NIK unik setelah beberapa percobaan.');
            }
    
            return $nik;
    
        } catch (\Exception $e) {
            // Menangkap error dan menampilkan pesan error
            // \Log::error('Error generating NIK: ' . $e->getMessage());
            return response()->json(['error' => 'Gagal menghasilkan NIK: ' . $e->getMessage()], 500);
        }
    }
    
    


    protected $casts = [
        'tanggal_lahir' => 'date',
    ];
    public function formatDate($date)
    {
        return Carbon::parse($date)->locale('id')->isoFormat('D MMMM Y');
    }

    public function agama()
    {
        return $this->belongsTo(Agama::class, 'agama_id');
    }

    public function jenis_kelamin()
    {
        return $this->belongsTo(JenisKelamin::class, 'kelamin_id');
    }

    public function gol_darah()
    {
        return $this->belongsTo(GolDarah::class, 'gol_darah_id');
    }

    public function status_kawin()
    {
        return $this->belongsTo(StatusKawin::class, 'status_kawin_id');
    }

    public function pekerjaan()
    {
        return $this->belongsTo(Pekerjaan::class, 'pekerjaan_id');
    }

    public function kewarganegaraan()
    {
        return $this->belongsTo(Kewarganegaraan::class, 'kewarganegaraan_id');
    }

    public function KK()
    {
        return $this->belongsTo(MasterKK::class, 'no_kk', 'no_kk');
    }

    public function status_hubungan_keluarga()
    {
        return $this->belongsTo(StatusHubunganKeluarga::class, 'status_hubungan_id', 'id');
    }

    public function scopeFilter(Builder $query): void
    {
        $query->where('nama', 'like', '%' . request('search') . '%');
    }
}
