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
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


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
public function update(Request $request)
{
    $forms = $request->input('forms'); // Data dikirim dalam bentuk array
    // dd($forms);
    
    DB::transaction(function () use ($forms) {
        foreach ($forms as $form) {
            // Validasi data terkait dengan id
            if (isset($form['nik'])) {
                // Update data penduduk berdasarkan ID
                \App\Models\DataPenduduk::where('nik', $form['nik'])->update([
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
                    'alamat_id' => $form['alamat']['id'],
                ]);
            }
        }
    });

    return to_route('population_data')->with('success', 'Data berhasil diperbarui.');
}

    public function edit(Request $request){
        $selectedId = $request->input('id');
        $data_penduduk = DataPenduduk::with(['agama',
            'jenis_kelamin',
            'pekerjaan',
            'gol_darah',
            'status_kawin',
            'kewarganegaraan',
            'alamat.village.district.regency'])->whereIn('id', $selectedId )->get();
        $formatDataPenduduk = $data_penduduk->map(function ($item){
            return [
                'id' => $item->id,
                'nik' => $item->nik,
                'nama'=> $item->nama,
                'tempat_lahir' => $item->tempat_lahir,
                'tanggal_lahir' => Carbon::parse($item->tanggal_lahir)->format('Y-m-d'),
                'jenis_kelamin' => ['id' => $item->jenis_kelamin->id,'jenis_kelamin' => $item->jenis_kelamin->jenis_kelamin],
                'gol_darahs' => ['id' => $item->gol_darah->id,'gol_darah' => $item->gol_darah->gol_darah],
                'agama' => ['id' => $item->agama->id,'agama' => $item->agama->agama],
                'status_kawin' => ['id' => $item->status_kawin->id,'status' => $item->status_kawin->status],
                'pekerjaan' => ['id' => $item->pekerjaan->id,'pekerjaan' => $item->pekerjaan->pekerjaan],
                'kewarganegaraan' =>['id'=>$item->kewarganegaraan->id,'kewarganegaraan' => $item->kewarganegaraan->kewarganegaraan],
                'alamat' => [
                    'id' => $item->alamat->id,
                    'alamat' => $item->alamat->alamat,
                    'kelurahan_id' => $item->alamat->kelurahan_id,
                    'kelurahan_nama' => $item->alamat->village->name,
                    'kecamatan_nama' => $item->alamat->village->district->name,
                    'kabupaten_nama' => $item->alamat->village->district->regency->name,
                ]
            ];
        });
        return Inertia::render('Form/EditPenduduk', [
            'data_penduduk' => $formatDataPenduduk,
            'agama' => Agama::all(),
            'dataKelamin' => JenisKelamin::all(),
            'dataGolDarah' => GolDarah::all(),
            'dataStatusKawin' => StatusKawin::all(),
            'dataPekerjaan' => Pekerjaan::all(),
            'dataKewarganegaraan' => Kewarganegaraan::all(),
        ]);
    }



}
