<?php

namespace App\Http\Controllers;

use App\Models\DataPenduduk;
use App\Models\MasterKK;
use App\Models\Village;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchDesa(Request $request)
    {
        $search = $request->input('searchDesa');

        // Pastikan provinsi adalah Kepulauan Riau
        $results = Village::where('name', 'like', "%$search%")
            ->whereHas('district.regency.province', function ($query) {
                // Filter untuk provinsi Kepulauan Riau
                $query->where('name', 'Kepulauan Riau');
            })
            ->with(['district.regency.province']) // Include relasi
            ->take(5) // Batasi hanya 5 hasil
            ->get();

        return response()->json($results); // Kirim hasil sebagai JSON
    }
    public function searchNIK(Request $request)
    {
        $searchQuery = $request->input('searchNIK');

        // Lakukan pencarian di database atau logika lain untuk menemukan kepala keluarga
        $result = DataPenduduk::where('nik', 'like', "%$searchQuery%")
            ->orWhere('nama', 'like', "%$searchQuery%")
            ->take(5)
            ->get();

        // Menggunakan map untuk mengembalikan hanya nik dan nama
        $mappedResult = $result->map(function($item) {
            return [
                'nik' => $item->nik,
                'name' => $item->nama,
                'no_kk'=> $item->no_kk,
            ];
        });

        return response()->json($mappedResult);
    }

    public function searchKK(Request $request)
    {
        $searchQuery = $request->input('searchKK');
        


        // Lakukan pencarian di database atau logika lain untuk menemukan kepala keluarga
        $result = MasterKK::with(['data_penduduk', 'village.district.regency'])
            ->where('no_kk', 'like', "%$searchQuery%")
            ->take(5)
            ->get();
            // dd($result);
        

        // Menggunakan map untuk mengembalikan hanya nik dan nama
        // no_kk: string;
        // alamat:string;
        // rt:string;
        // rw:string;
        // kelurahan_id: string;
        // data_penduduk: DataPendudukProps[];
        // village: Village;
        // created_at: string;
        $mappedResult = $result->map(function($item) {
            return [
                'no_kk'=> $item->no_kk,
                'alamat'=> $item->alamat,
                'rt'=> $item->rt,
                'rw'=> $item->rw,
                'kelurahan_id'=> $item->kelurahan_id,
                'data_penduduk'=> $item->data_penduduk,
                'village'=> $item->village,
                'created_at'=> $item->created_at,
            ];
        });
        // dd($mappedResult);

        return response()->json($mappedResult);
    }
}


