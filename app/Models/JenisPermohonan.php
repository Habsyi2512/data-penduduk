<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisPermohonan extends Model
{
    protected $fillable = ['id','jenis_permohonan'];

    public function pemohon() {
        return $this->hasMany(Pemohon::class,'jenis_permohonan_id');
    }
}
