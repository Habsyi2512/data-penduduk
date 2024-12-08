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

    // Mengarahkan ke halaman index setelah berhasil
    return Inertia::location(route('dashboard'));
}

}
