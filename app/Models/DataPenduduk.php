<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class DataPenduduk extends Model
{
    protected $fillable = ['nik', 'nama', 'tempat_lahir', 'tanggal_lahir', 'kelamin_id', 'agama_id', 'pekerjaan_id', 'gol_darah_id', 'status_kawin_id', 'kewarganegaraan_id'];
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
}
