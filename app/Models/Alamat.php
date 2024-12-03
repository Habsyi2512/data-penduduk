<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alamat extends Model
{
    public function village(){
        return $this->belongsTo(Village::class, 'kelurahan_id', 'id');
    }
}
