<?php

namespace App\Http\Controllers;

use App\Models\Kewarganegaraan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KewarganegaraanController extends Controller
{
    public function index()
    {
        $kewarganegaraan = Kewarganegaraan::all();
        return Inertia::render('Form/DataKewarganegaraan', ['kewarganegaraan' => $kewarganegaraan]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kewarganegaraan' => 'required',
        ]);
        Kewarganegaraan::create([
            'kewarganegaraan' => $request->kewarganegaraan,
        ]);
        return Inertia::location('/dashboard');
    }
}
