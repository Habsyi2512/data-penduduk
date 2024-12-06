<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pekerjaan extends Model
{
    protected $fillable = ['pekerjaan'];

    public function data_penduduk()
    {
        return $this->hasMany(DataPenduduk::class, 'pekerjaan_id');
    }
}
