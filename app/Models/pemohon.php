<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pemohon extends Model
{
    protected $fillable = ['id', 'jenis_permohonan_id', 'status_permohonan_id', 'tgl_dibuat', 'tgl_diterima'];

    public function JenisPermohonan()
    {
        return $this->belongsTo(JenisPermohonan::class, 'jenis_permohonan_id', 'id');
    }

    public function StatusPermohonan()
    {
        return $this->belongsTo(StatusPermohonan::class, 'status_permohonan_id', 'id');
    } 
}
