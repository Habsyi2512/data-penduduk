<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusPermohonan extends Model
{
    protected $fillable = ['id', 'status_permohonan'];

    public function pemohon(){
        return $this->hasMany(Pemohon::class,'status_permohonan', 'id');
    }
}
