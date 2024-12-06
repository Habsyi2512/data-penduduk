<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GolDarah extends Model
{
    protected $fillable = ['gol_darah'];

    public function data_penduduk()
    {
        return $this->hasMany(DataPenduduk::class, 'gol_darah_id');
    }
}
