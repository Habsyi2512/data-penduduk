<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agama extends Model
{
    protected $fillable = 'agama';

    public function dataPenduduks()
    {
        return $this->hasMany(DataPenduduk::class, 'agama_id');
    }
}
