<?php

namespace App\Http\Controllers;

use App\Helpers\PendudukHelper;
use App\Models\Agama;
use App\Models\DataPenduduk;
use App\Models\GolDarah;
use App\Models\JenisKelamin;
use App\Models\Kewarganegaraan;
use App\Models\MasterKK;
use App\Models\Pekerjaan;
use App\Models\StatusHubunganKeluarga;
use App\Models\StatusKawin;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class PendudukFormController extends Controller
{
    private function getMasterData() {
        return [
            'agama' => Agama::all(),
            'dataKelamin' => JenisKelamin::all(),
            'dataGolDarah' => GolDarah::get(),
            'dataStatusKawin' => StatusKawin::all(),
            'dataPekerjaan' => Pekerjaan::all(),
            'dataKewarganegaraan' => Kewarganegaraan::all(),
            'dataStatusHubungan' => StatusHubunganKeluarga::all(),
        ];
    }

    public function index() {
        return Inertia::render('Form/AddPenduduk', $this->getMasterData());
    }

    public function store(Request $request, DataPenduduk $data) 
    {
        // Ambil data dari request tanpa validasi
        $forms = $request->input('forms');
        // dd($forms);

        // Iterasi setiap data
        foreach ($forms as $form) {
            // Simpan data alamat terlebih dahulu
            $data_kk = MasterKK::with(['village.district.regency'])
                ->where('no_kk', $form['no_kk'])
                ->first();
            $data_kecamatan = $data_kk->village->district;
            $tanggal_lahir = $form['tanggal_lahir'];
            $generateNIK = DataPenduduk::generateNIK($data_kecamatan->id, $tanggal_lahir, $data_kk->no_kk);

            // Setelah alamat disimpan, gunakan ID-nya untuk data penduduk
            if($generateNIK){
                DataPenduduk::create([
                    'nik' => $generateNIK,
                    'nama' => $form['nama'],
                    'tempat_lahir' => $form['tempat_lahir'],
                    'tanggal_lahir' => $form['tanggal_lahir'],
                    'no_kk' => $form['no_kk'], 
                    'kelamin_id' => $form['jenis_kelamin']['id'],
                    'gol_darah_id' => $form['gol_darahs']['id'],
                    'agama_id' => $form['agama']['id'],
                    'status_kawin_id' => $form['status_kawin']['id'],
                    'pekerjaan_id' => $form['pekerjaan']['id'],
                    'kewarganegaraan_id' => $form['kewarganegaraan']['id'],
                    'status_hubungan_id' => $form['status_hubungan']['id'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
            $data->refresh();
        }

        return to_route('tambah-penduduk')->with('success', count($forms) . ' Data berhasil ditambahkan.');
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
    // dd();
    
    DB::transaction(function () use ($forms) {
        foreach ($forms as $form) {
            if (isset($form['nik'])) {
                // Update data penduduk
                $penduduk = \App\Models\DataPenduduk::where('nik', $form['nik'])->first();
    
                if ($penduduk) {
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
                    ]);

                    $penduduk->alamat->update([
                        'alamat' => $form['alamat']['alamat'],
                        'kelurahan_id' => $form['alamat']['kelurahan_id'],
                    ]);
                }
            }
        }
    });
    
    return to_route('population_data')->with('success', count($forms) . ' Data berhasil diperbarui.');

}

    public function edit(Request $request){
        $selectedId = $request->input('id');
        // dd($selectedId);
        $data_penduduk = DataPenduduk::with([
            'agama',
            'jenis_kelamin',
            'pekerjaan',
            'gol_darah',
            'status_kawin',
            'kewarganegaraan',
            ])->whereIn('id', $selectedId )->get();
        
        $formatDataPenduduk = $data_penduduk->map(fn($item) => PendudukHelper::formatPendudukData($item));

        return Inertia::render('Form/EditPenduduk', array_merge(
            ['data_penduduk' => $formatDataPenduduk],
            $this->getMasterData()
        ));
    }



}
