<?php

namespace App\Http\Controllers;

use App\Models\Agama;
use Illuminate\Http\Request;
use App\Models\DataPenduduk;
use App\Models\GolDarah;
use App\Models\JenisKelamin;
use App\Models\Kewarganegaraan;
use App\Models\Pekerjaan;
use App\Models\StatusKawin;
use Inertia\Inertia;

class DataPendudukController extends Controller
{
    public function index(Request $request)
    {

        return Inertia::render('Population_data', [
            'data_penduduk' => DataPenduduk::filter()->paginate(5),
            'csrf_token' => csrf_token(),
        ]);
    }

    public function create()
    {
        $agama = Agama::all();
        $jenis_kelamin = JenisKelamin::all();
        $gol_darah = GolDarah::all();
        $kewarganegaraan = Kewarganegaraan::all();
        $pekerjaan = Pekerjaan::all();
        $status_kawin = StatusKawin::all();

        return inertia::render('Insert_population', [
            'agama' => $agama,
            'jenis_kelamin' => $jenis_kelamin,
            'gol_darah' => $gol_darah,
            'kewarganegaraan' => $kewarganegaraan,
            'pekerjaan' => $pekerjaan,
            'status_kawin' => $status_kawin,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required',
            'unique:data_penduduks,nik',
            'regex:/^[0-9]{16}$/',
            'nama' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required|date',
            'kelamin_id' => 'required|exists:jenis_kelamins,id',
            'agama_id' => 'required|exists:agamas,id',
            'gol_darah_id' => 'required|exists:gol_darahs,id',
            'status_kawin_id' => 'required|exists:status_kawins,id',
            'kewarganegaraan_id' => 'required|exists:kewarganegaraans,id',
            'pekerjaan_id' => 'required|exists:pekerjaans,id',
        ]);
        return Inertia::location('/population');
    }
}
