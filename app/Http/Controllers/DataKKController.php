<?php

namespace App\Http\Controllers;

use App\Models\MasterKK;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataKKController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['kabupaten', 'no_kk']);

        // Ambil data menggunakan fungsi di model
        $result = MasterKK::getDataWithFilters($filters);

        return Inertia::render('DataKK', [
            'data' => $result['data'],
            'filters' => $result['filters'],
        ]);
    }



}
