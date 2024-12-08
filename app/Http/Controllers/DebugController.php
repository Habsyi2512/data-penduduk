<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DebugController extends Controller
{
    public function index()
{
    $alamat = Alamat::find(1);
    return Inertia::render('Debug', [
        'alamat' => $alamat->village->district->regency->province->name
    ]);
}

public function search(Request $request)
{
    $query = $request->input('q');

    // Query data desa/kelurahan yang berada di provinsi Kepulauan Riau
    $results = Village::where('name', 'like', '%' . $query . '%')
        ->whereHas('district.regency.province', function ($q) {
            $q->where('id', 21); // Batasi hanya pada provinsi dengan ID 21 (Kepulauan Riau)
        })
        ->with(['district.regency.province']) // Load relasi sampai province
        ->limit(10)
        ->get()
        ->map(function ($village) {
            return [
                'id' => $village->id,
                'name' => $village->name,
                'district_id' => $village->district_id,
                'district_name' => $village->district->name ?? null, // Nama kecamatan
                'regency_id' => $village->district->regency_id ?? null,
                'regency_name' => $village->district->regency->name ?? null, // Nama kabupaten
                'province_id' => $village->district->regency->province_id ?? null,
                'province_name' => $village->district->regency->province->name ?? null, // Nama provinsi
            ];
        });

    return response()->json($results);
}


}
