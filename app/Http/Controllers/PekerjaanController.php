<?php

namespace App\Http\Controllers;

use App\Models\Pekerjaan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PekerjaanController extends Controller
{
    public function index(){
        $pekerjaan = Pekerjaan::all();

        return Inertia::render('Form/DataPekerjaan', ['pekerjaan' => $pekerjaan]);
    }

    public function store(Request $request){
        $request->validate([
            'pekerjaan' => 'required'
        ]);

        Pekerjaan::create([
            'pekerjaan' => $request->pekerjaan
        ]);
        return Inertia::location('/dashboard');
    }
}
