<?php

namespace App\Http\Controllers;

use App\Models\DataPenduduk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArsipSampahController extends Controller
{
    public function displayBioata(){
        $data_penduduk = DataPenduduk::onlyTrashed()->filter()->paginate(8);
        //Menampilkan Jumlah Penduduk

        return Inertia::render('Arsip/ArsipBiodata', [
            'data' => $data_penduduk,
        ]);
    }
    public function displayKartuKeluarga(){
        return;
    }
}
