<?php

namespace App\Http\Controllers;

use App\Models\Agama;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgamaController extends Controller
{
    public function index()
    {
        // Mengambil semua data agama
        $agamas = Agama::all();

        // Mengirim data agama ke view
        return Inertia::render('Form/DataAgama', ['data_agama' => $agamas]);
    }
}
