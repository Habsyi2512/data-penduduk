<?php

namespace App\Http\Controllers;

use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DebugController extends Controller
{
    public function index()
{
    return Inertia::render('Debug');
}

    public function search(Request $request){
    $query = $request->input('q');
    $results = Village::where('name', 'like', '%' . $query . '%')
        ->limit(10) 
        ->get();

    return response()->json($results);
    }
}
