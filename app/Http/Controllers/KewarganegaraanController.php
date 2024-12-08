<?php

namespace App\Http\Controllers;

use App\Models\Kewarganegaraan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KewarganegaraanController extends Controller
{
    public function index(){
        $kewarganegaraan = Kewarganegaraan::all();
        return Inertia::render('Form/DataKewarganegaraan', ['kewarganegaraan' => $kewarganegaraan]);
    }
}
