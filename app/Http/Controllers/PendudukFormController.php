<?php

namespace App\Http\Controllers;

use App\Models\Agama;
use App\Models\DataPenduduk;
use App\Models\GolDarah;
use App\Models\JenisKelamin;
use App\Models\Kewarganegaraan;
use App\Models\Pekerjaan;
use App\Models\StatusKawin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendudukFormController extends Controller
{
    public function index()
    {
        $agama = Agama::all();
        $data_kelamin = JenisKelamin::all();
        $data_gol_darah = GolDarah::all();
        $status_kawin = StatusKawin::all();
        $pekerjaan = Pekerjaan::all();
        $kewarganegaraan = Kewarganegaraan::all();

        return Inertia::render('Form/AddPenduduk', [
            'agama' => $agama,
            'dataKelamin' => $data_kelamin,
            'dataGolDarah' => $data_gol_darah,
            'dataStatusKawin' => $status_kawin,
            'dataPekerjaan' => $pekerjaan,
            'dataKewarganegaraan' => $kewarganegaraan,
        ]);
    }

    public function store(Request $request)
{
    // Ambil data dari request tanpa validasi
    $forms = $request->input('forms');
    // dd($forms);

    // Iterasi setiap data
    foreach ($forms as $form) {
        // Simpan data alamat terlebih dahulu
        $alamat = \App\Models\Alamat::create([
            'alamat' => $form['alamat']['alamat'],
            'kelurahan_id' => $form['alamat']['kelurahan_id'],
        ]);

        // Setelah alamat disimpan, gunakan ID-nya untuk data penduduk
        DataPenduduk::create([
            'nik' => $form['nik'],
            'nama' => $form['nama'],
            'tempat_lahir' => $form['tempat_lahir'],
            'tanggal_lahir' => $form['tanggal_lahir'],
            'kelamin_id' => $form['jenis_kelamin']['id'],
            'gol_darah_id' => $form['gol_darahs']['id'],
            'agama_id' => $form['agama']['id'],
            'status_kawin_id' => $form['status_kawin']['id'],
            'pekerjaan_id' => $form['pekerjaan']['id'],
            'kewarganegaraan_id' => $form['kewarganegaraan']['id'],
            'alamat_id' => $alamat->id,
            
        ]);
    }

    return to_route('population_data');
}

public function getPendudukData(Request $request)
{
    $selectedId = $request->input('selected_ids')[0];
    $pendudukData = DataPenduduk::findOrFail($selectedId);

    return response()->json([
        'data_penduduk' => $pendudukData,
        'agama' => Agama::all(),
        'dataKelamin' => JenisKelamin::all(),
        'dataGolDarah' => GolDarah::all(),
        'dataStatusKawin' => StatusKawin::all(),
        'dataPekerjaan' => Pekerjaan::all(),
        'dataKewarganegaraan' => Kewarganegaraan::all(),
    ]);
}

public function edit($id)
{
    $penduduk = DataPenduduk::findOrFail($id);

    return Inertia::render('Debug', [
        'data_penduduk' => $penduduk,
    ]);
}

public function update(Request $request, $nik)
{
    // Ambil data dari request
    $forms = $request->input('forms');
    
    // Temukan data penduduk berdasarkan NIK
    $penduduk = DataPenduduk::where('nik', $nik)->first();

    // Jika data penduduk tidak ditemukan, kembalikan response 404
    if (!$penduduk) {
        return response()->json(['message' => 'Data penduduk tidak ditemukan.'], 404);
    }

    // Iterasi setiap form data yang diterima
    foreach ($forms as $form) {
        // Perbarui data alamat terlebih dahulu
        if (isset($form['alamat'])) {
            $alamat = \App\Models\Alamat::updateOrCreate(
                ['id' => $penduduk->alamat_id], // Cari alamat berdasarkan ID yang terkait dengan penduduk
                [
                    'alamat' => $form['alamat']['alamat'],
                    'kelurahan_id' => $form['alamat']['kelurahan_id'],
                ]
            );
        }

        // Perbarui data penduduk dengan data yang diterima
        $penduduk->update([
            'nik' => $form['nik'],
            'nama' => $form['nama'],
            'tempat_lahir' => $form['tempat_lahir'],
            'tanggal_lahir' => $form['tanggal_lahir'],
            'kelamin_id' => $form['jenis_kelamin']['id'],
            'gol_darah_id' => $form['gol_darahs']['id'],
            'agama_id' => $form['agama']['id'],
            'status_kawin_id' => $form['status_kawin']['id'],
            'pekerjaan_id' => $form['pekerjaan']['id'],
            'kewarganegaraan_id' => $form['kewarganegaraan']['id'],
            'alamat_id' => $alamat->id, // Menggunakan ID alamat yang baru diperbarui atau dibuat
        ]);
    }

    return to_route('population_data');
}




    public function getData(string $id){
        $data_penduduk = DataPenduduk::with(['agama',
            'jenis_kelamin',
            'pekerjaan',
            'gol_darah',
            'status_kawin',
            'kewarganegaraan',
            'alamat.village.district.regency'])->findOrFail($id);
        if($data_penduduk){
             return Inertia::render('Form/EditPenduduk', [
                'data_penduduk'=>$data_penduduk,
                'agama' => Agama::all(),
                'dataKelamin' => JenisKelamin::all(),
                'dataGolDarah' => GolDarah::all(),
                'dataStatusKawin' => StatusKawin::all(),
                'dataPekerjaan' => Pekerjaan::all(),
                'dataKewarganegaraan' => Kewarganegaraan::all(),
             ]); 
        }
    }



}
