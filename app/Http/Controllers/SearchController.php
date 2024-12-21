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
        if (!$search) {
            return response()->json(['message' => 'Masukkan kata kunci untuk pencarian'], 400);
        }

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
    
        if (!$searchQuery) {
            return response()->json(['message' => 'Masukkan kata kunci untuk pencarian'], 400);
        }
    
        $result = DataPenduduk::where('nik', 'like', "%$searchQuery%")
            ->orWhere('nama', 'like', "%$searchQuery%")
            ->take(5)
            ->get();
    
        $mappedResult = $result->map(function ($item) {
            return [
                'nik' => $item->nik,
                'name' => $item->nama,
                'no_kk' => $item->no_kk,
            ];
        });
    
        return response()->json($mappedResult);
    }
    

    public function searchKK(Request $request)
    {
        $searchQuery = $request->input('searchKK');
        
        if (!$searchQuery) {
            return response()->json(['message' => 'Masukkan kata kunci untuk pencarian'], 400);
        }

        // Lakukan pencarian di database atau logika lain untuk menemukan kepala keluarga
        $result = MasterKK::with(['data_penduduk', 'village.district.regency'])
            ->where('no_kk', 'like', "%$searchQuery%")
            ->take(5)
            ->get();
            // dd($result);
        
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

        return response()->json($mappedResult, 200, );
    }
}


