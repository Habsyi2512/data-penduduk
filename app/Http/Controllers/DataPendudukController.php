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
        $data_penduduk = DataPenduduk::filter()->paginate(8);
        //Menampilkan Jumlah Penduduk
        $total_penduduk = DataPenduduk::count();

        //Menampilkan Jumlah Penduduk Tidak Bekerja
        $jumlahTidakBekerja = DataPenduduk::whereNull('pekerjaan_id')->orWhere('pekerjaan_id', '==', 1)->count();
        $persentaseTidakBekerja = $total_penduduk > 0 ? ($jumlahTidakBekerja / $total_penduduk) * 100 : 0;

        //Menampilkan Jumlah Penduduk Berdasarkan Jenis Kelamin
        $jumlahLakiLaki = DataPenduduk::where('kelamin_id', 1)->count();
        $jumlahPerempuan = DataPenduduk::where('kelamin_id', 2)->count();

        return Inertia::render('Population_data', [
            'data_penduduk' => $data_penduduk,
            'total_penduduk' => $total_penduduk,
            'persentaseTidakBekerja' => $persentaseTidakBekerja,
            'jumlahLakiLaki' => $jumlahLakiLaki,
            'jumlahPerempuan' => $jumlahPerempuan,
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

    public function delete(){
        $data = request()->input('id');
        // dd($data);
        DataPenduduk::whereIn('nik', $data)->delete();

        return to_route('population_data')->with('success', 'Data Penduduk Berhasil Dihapus');
    }
    public function restore()
    {
        $data = request()->input('id');
    
        if (empty($data)) {
            return redirect()->route('population_data')->with('error', 'Tidak ada data yang dipilih untuk dipulihkan.');
        }
    
        // Restore data yang telah soft-deleted
        $selectedData = DataPenduduk::whereIn('nik', $data)->restore();
    
        // Mengembalikan ke halaman sebelumnya dengan pesan sukses
        return to_route('arsip.biodata')->with('success', 'Data Penduduk Berhasil Dipulihkan');
    }
}
