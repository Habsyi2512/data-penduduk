<?php

namespace App\Http\Controllers;

use App\Models\DataPenduduk;
use App\Models\Village;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchDesa(Request $request)
    {
        $search = $request->get('searchDesa');

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
    public function searchKepalaKeluraga(Request $request)
{
    $searchQuery = $request->input('searchKepalaKeluarga');

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
}


