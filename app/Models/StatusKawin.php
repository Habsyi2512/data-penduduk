<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusKawin extends Model
{
    protected $fillable = ['status'];

    public function data_penduduk()
    {
        return $this->hasMany(DataPenduduk::class, 'status_kawin_id');
    }
}
