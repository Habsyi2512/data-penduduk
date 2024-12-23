<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Village extends Model
{
    public function district(){
        return $this->belongsTo(District::class);
    }

    public function master_kk()
    {
        return $this->hasMany(MasterKK::class,'kelurahan_id', 'id');
    }
}
