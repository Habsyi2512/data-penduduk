<?php

namespace App\Http\Controllers;

use App\Models\Village;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchDesa(Request $request)
    {
        $search = $request->get('query');

        $results = Village::where('name', 'like', "%$search%")
            ->with(['district.regency.province']) // Include relasi
            ->get();

        return response()->json($results); // Kirim hasil sebagai JSON
    }
}
