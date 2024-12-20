<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisKelamin extends Model
{
    protected $fillable = ['jenis_kelamin'];

    public function data_penduduk()
    {
        return $this->hasMany(DataPenduduk::class, 'kelamin_id');
    }
}
