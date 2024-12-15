<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class pemohon extends Model
{
    protected $fillable = ['id', 'jenis_permohonan_id', 'status_permohonan_id', 'tgl_dibuat', 'tgl_diterima'];
    protected $casts = ['tgl_dibuat' => 'date', 'tgl_diterima' => 'date'];
}
