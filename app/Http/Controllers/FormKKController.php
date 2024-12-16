<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\DataPenduduk;
use App\Models\MasterKK;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormKKController extends Controller
{
    public function index(){
        return Inertia::render('Form/AddKartuKeluarga');
    }

    public function store(Request $request){
        $alamat = $request->input('alamat');
        $kelurahan_id = $request->input('kelurahan_id');
        $nik_input = $request->input('kepala_keluarga_nik');
        $kecamatan_id = $request->input('kecamatan_id');
        $kabupaten_id = $request->input('kabupaten_id');
        $no_kk = $request->input('no_kk');
        $no_kk_semula = $request->input('no_kk_semula');
    
        $data_kk_lama = MasterKK::with(['data_penduduk', 'alamat.village.district.regency'])
                        ->where('no_kk', $no_kk_semula)
                        ->first();
        
    
        if($no_kk == ''){
            $generate_kk = MasterKK::generateNoKK($kabupaten_id, $kecamatan_id);
        }
    
        // Update data penduduk berdasarkan NIK
        $data_nik = DataPenduduk::where('nik', $nik_input)->first();
        if ($data_nik && $data_nik->status_hubungan_id != 1) {
            $data_nik->update(['status_hubungan_id' => 1]);
        }
    
        if ($data_kk_lama && $data_kk_lama->data_penduduk->every(function($penduduk) {
            return $penduduk->status_hubungan_id != 1;
        })) {
            
            $penduduk_pertama = $data_kk_lama->data_penduduk->first();
            $penduduk_pertama->update(['status_hubungan_id' => 1]);
        }
    
        // Membuat alamat baru
        $alamat = Alamat::create([
            'alamat'=> $alamat,
            'kelurahan_id'=> $kelurahan_id,
        ]);
    
        // Membuat MasterKK baru
        $kk_baru = MasterKK::create([
            'no_kk' => $generate_kk,
            'alamat_id' => $alamat->id,
        ]);
    
        // Mengupdate data penduduk dengan no_kk baru
        if($data_nik){
            $data_nik->update([
                'no_kk' => $kk_baru->no_kk
            ]);
        }
    
        return to_route('kk.display')->with('success', '');
    }
    
}
