<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterKK extends Model
{
    //
    protected $fillable = ['no_kk', 'alamat_id'];

    public function data_penduduk(){
        return $this->hasMany(DataPenduduk::class, 'no_kk', 'no_kk');
    }
    
    public function alamat(){
        return $this->belongsTo(Alamat::class, 'alamat_id', 'id');
    }
}
