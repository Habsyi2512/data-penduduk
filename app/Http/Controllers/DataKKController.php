<?php

namespace App\Http\Controllers;

use App\Models\MasterKK;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataKKController extends Controller
{
    public function index(){
        $data = MasterKK::with(['data_penduduk', 'alamat.village.district.regency'])->paginate(5);
        // dd($data);
        return Inertia::render('DataKK', [
            'data'=>$data
        ]);
    }
}
