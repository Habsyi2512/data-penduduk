<?php

namespace App\Http\Controllers;

use App\Models\StatusKawin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusKawinController extends Controller
{
    public function index()
    {
        $statusKawin = StatusKawin::all();

        return Inertia::render('Form/DataStatusKawin', ['status' => $statusKawin]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'status' => 'required',
        ]);

        StatusKawin::create([
            'status' => $request->status,
        ]);
        return Inertia::location('/dashboard');
    }
}
