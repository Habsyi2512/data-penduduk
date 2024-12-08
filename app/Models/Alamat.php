<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alamat extends Model
{
    protected $fillable = [
        'alamat',
        'kelurahan_id',
    ];
    public function village(){
        return $this->belongsTo(Village::class, 'kelurahan_id', 'id');
    }

    public function data_penduduk(){
        return $this->hasMany(DataPenduduk::class, 'alamat_id', 'id');
    }
}
