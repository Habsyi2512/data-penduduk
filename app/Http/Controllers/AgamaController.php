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

    public function store(Request $request)
    {
        $request->validate([
            'agama' => 'required|string|max:20',
        ]);

        Agama::create([
            'agama' => $request->agama,
        ]);

        return Inertia::location('/dashboard');
    }

    public function edit($id)
    {
        $agama = Agama::findOrFail($id);

        return Inertia::render('Form/EditDataAgama', ['data_agama' => $agama]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'agama' => 'required|string|max:20',
        ]);

        $agama = Agama::findOrFail($id);
        $agama->update([
            'agama' => $request->agama,
        ]);

        return Inertia::location('/dashboard');
    }
}
