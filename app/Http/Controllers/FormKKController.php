<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\DataPenduduk;
use App\Models\MasterKK;
use App\Models\Pemohon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormKKController extends Controller
{
    public function index(){
        return Inertia::render('Form/AddKartuKeluarga');
    }

    public function store(Request $request){
        $nik_input = $request->input('kepala_keluarga_nik');
        $kelurahan_id = $request->input('kelurahan_id');
        $kecamatan_id = $request->input('kecamatan_id');
        $kabupaten_id = $request->input('kabupaten_id');
        $no_kk_semula = $request->input('no_kk_semula');
        $alamat = $request->input('alamat');
        $rt = $request->input('rt');
        $rw = $request->input('rw');
        $generate_kk = MasterKK::generateNoKK($kabupaten_id, $kecamatan_id);
        $data_nik = DataPenduduk::where('nik', $nik_input)->first();

        $kk_baru = MasterKK::create([
            'no_kk' => $generate_kk,
            'alamat' => $alamat,
            'rt' => $rt,
            'rw' => $rw,
            'kelurahan_id' => $kelurahan_id,
        ]);

        // Mengupdate data penduduk dengan no_kk baru
        if($kk_baru->no_kk){
                $data_nik->no_kk = $kk_baru->no_kk; 
                $data_nik->refresh();
        }
        if ($data_nik) {
            if ($data_nik->status_hubungan_id != 1) {
                $data_nik->status_hubungan_id = 1;
                $data_nik->refresh();
            }
        }

        $data_kk_lama = MasterKK::with(['data_penduduk', 'village.district.regency'])
                        ->where('no_kk', $no_kk_semula)
                        ->first();
        if ($data_kk_lama->data_penduduk->count() > 1) {
            $kepala_keluarga_lama = $data_kk_lama->data_penduduk->firstWhere('status_hubungan_id', 1);
    
            if ($kepala_keluarga_lama==null) {
                $penduduk_dengan_status_terkecil = $data_kk_lama->data_penduduk
                    ->sortBy('status_hubungan_id') 
                    ->first(); 
                $penduduk_dengan_status_terkecil->status_hubungan_id=1;
                $penduduk_dengan_status_terkecil->save();
            }
            
        }
        
        if($alamat && $kk_baru){
            Pemohon::create([
                'name' => $data_nik->nama,
                'jenis_permohonan' => 2,
                'status_permohonan' => 3,
            ]);
        }
    
        return to_route('kk.display')->with('success', 'Berhasil Membuat KK');
    }
    
}
