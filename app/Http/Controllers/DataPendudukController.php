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
        $search = $request->get('search');
    
        $data_penduduk = DataPenduduk::with([
            'agama',
            'jenis_kelamin',
            'pekerjaan',
            'gol_darah',
            'status_kawin',
            'kewarganegaraan',
            'alamat.village.district.regency'
        ])
        ->when($search, function ($query) use ($search) {
            $query->where('nama', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%")
                  ->orWhereHas('alamat', function ($q) use ($search) {
                      $q->where('alamat', 'like', "%{$search}%");
                  });
        })
        ->paginate(5);

        
    
        return Inertia::render('Population_data', [
            'data_penduduk' => $data_penduduk,
            'filters' => [
                'search' => $search,
            ],
            'csrf_token' => csrf_token(),
        ]);
    }

    


    public function show($id)
    {
        $data_penduduk = DataPenduduk::with(['agama', 'jenis_kelamin', 'gol_darah', 'kewarganegaraan', 'pekerjaan', 'status_kawin', ''])->findOrFail($id);
        return Inertia::render('data_penduduk_detail', [
            'data_penduduk' => $data_penduduk,
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
        $data_penduduk = DataPenduduk::create($validated);
        return Inertia::location('/population');
    }

    // public function update(Request $request)
    // {
    //     // Validasi ID yang dikirim
    //     $request->validate([
    //         'selected_ids' => 'required|array|min:1',
    //         'selected_ids.*' => 'integer|exists:penduduks,id', // Validasi apakah ID ada di database
    //     ]);

    //     // Ambil ID yang dipilih
    //     $selectedIds = $request->input('selected_ids');

    //     // Lakukan update sesuai dengan kebutuhan, misalnya update status
    //     DataPenduduk::whereIn('id', $selectedIds)->update([
    //         'status' => 'updated', // Misalnya mengupdate status
    //     ]);

    //     return response()->json(['message' => 'Data berhasil diupdate']);
    // }

}

  