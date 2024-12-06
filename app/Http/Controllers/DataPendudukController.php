<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DataPenduduk;
use Inertia\Inertia;

class DataPendudukController extends Controller
{
    public function index()
    {
        $data_penduduk = DataPenduduk::with(['agama', 'jenis_kelamin', 'pekerjaan', 'gol_darah', 'status_kawin', 'kewarganegaraan', 'alamat'])->get(); // Pastikan data ini berbentuk koleksi/array

        return Inertia::render('Population_data', [
            'population_data' => $data_penduduk,
        ]);
    }

    public function show($id)
    {
        $data_penduduk = DataPenduduk::with(['agama', 'jenis_kelamin', 'gol_darah', 'kewarganegaraan', 'pekerjaan', 'status_kawin', ''])->findOrFail($id);
        return view('data_penduduk.show', compact('data_penduduk'));
    }
}

