<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pemohon extends Model
{
    protected $fillable = ['id', 'name', 'jenis_permohonan', 'status_permohonan', 'created_at', 'update_at'];

    public function JenisPermohonan()
    {
        return $this->belongsTo(JenisPermohonan::class, 'jenis_permohonan', 'id');
    }

    public function StatusPermohonan()
    {
        return $this->belongsTo(StatusPermohonan::class, 'status_permohonan', 'id');
    } 
}
