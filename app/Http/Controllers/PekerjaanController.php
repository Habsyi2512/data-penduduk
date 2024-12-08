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
}
