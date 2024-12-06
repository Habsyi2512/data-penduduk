<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kewarganegaraan extends Model
{
    protected $fillable = ['kewarganegaraan'];

    public function data_penduduk()
    {
        return $this->hasMany(DataPenduduk::class, 'kewarganegaraan_id');
    }
}
