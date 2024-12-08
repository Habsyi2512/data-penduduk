<?php

namespace App\Http\Controllers;

use App\Models\GolDarah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GolDarahController extends Controller
{
    public function index()
    {
        $gol_darah = GolDarah::all();
        return Inertia::render('Form/DataGolDarah', ['gol_darah' => $gol_darah]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'gol_darah' => 'required',
        ]);

        GolDarah::create([
            'gol_darah' => $request->gol_darah,
        ]);
        return Inertia::location('/dashboard');
    }
}
