<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Village extends Model
{
    public function district(){
        return $this->belongsTo(District::class);
    }

    public function alamats()
{
    return $this->hasMany(Alamat::class, 'kelurahan_id', 'id');
}
}
