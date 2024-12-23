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
        $alamat = $request->input('alamat');
        $rt = $request->input('rt');
        $rw = $request->input('rw');
        $status_anggota_keluarga = $request->input('statusAnggotaKeluarga');
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
                $data_nik->save();
        }

        if($data_nik->status_hubungan_id==1){
            foreach($status_anggota_keluarga as $anggota){
                $update_status = DataPenduduk::where('nik', $anggota['nik'])->first();
                // dd($update_status);
                $update_status->status_hubungan_id = $anggota['status_hubungan']['id'];
                $update_status->save();
            }
        }

        if ($data_nik && $data_nik->status_hubungan_id != 1) {
            $data_nik->status_hubungan_id = 1;
            $data_nik->save();
        }
        
        if($alamat && $kk_baru){
            Pemohon::create([
                'name' => $data_nik->nama,
                'jenis_permohonan' => 2,
                'status_permohonan' => 3,
            ]);
        }
    
        return to_route('kk.display.form')->with('success', 'Berhasil Membuat KK Brow');
    }
    
}
