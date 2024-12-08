<?php

namespace App\Http\Controllers;

use App\Models\GolDarah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GolDarahController extends Controller
{
    public function index()
    {
        $ol_darah = GolDarah::all();
        return Inertia::render('Form/DataGolDarah', ['gol_darah' => $ol_darah]);
    }
}
