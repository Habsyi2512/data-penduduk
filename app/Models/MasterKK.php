<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class MasterKK extends Model
{
    //
    protected $table = 'master_kk';
    protected $fillable = ['no_kk', 'alamat_id'];

    public static function generateNoKK($regency, $district)
    {
        // Kode wilayah berdasarkan inputan
        $provinsi_code = '21';

        // Tanggal pemasukan data
        $tanggal = Carbon::now()->format('d'); // Tanggal (DD)
        $bulan = Carbon::now()->format('m');   // Bulan (MM)
        $tahun = Carbon::now()->format('y');   // Tahun (YY)

        // Nomor urut penerbitan KK dengan angka acak antara 1000 dan 9999
        $random_number = mt_rand(1000, 9999);

        // Gabungkan semua bagian
        $no_kk = $provinsi_code . $regency . $district . $tanggal . $bulan . $tahun . $random_number;

        return $no_kk;
    }

    public function data_penduduk(){
        return $this->hasMany(DataPenduduk::class, 'no_kk', 'no_kk');
    }
    
    public function alamat(){
        return $this->belongsTo(Alamat::class, 'alamat_id', 'id');
    }



// Di dalam Model MasterKK
    public function scopeFilter(Builder $query, array $filters){
        // Filter berdasarkan kabupaten
        if (!empty($filters['kabupaten'])) {
            $query->whereHas('alamat.village.district.regency', function ($query) use ($filters) {
                $query->where('id', $filters['kabupaten']);
            });
        }

        // Filter berdasarkan no_kk
        if (!empty($filters['no_kk'])) {
            $query->where('no_kk', 'like', '%' . $filters['no_kk'] . '%');
        }

        // Tambahkan filter lainnya jika diperlukan

        return $query;
    }

}
