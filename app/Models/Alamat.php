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

    public function KK(){
        return $this->hasMany(MasterKK::class, 'alamat_id', 'id');
    }
}
