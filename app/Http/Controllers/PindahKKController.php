<?php

namespace App\Http\Controllers;

use App\Models\MasterKK;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PindahKKController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('PindahKK');
    }

    public function update(Request $request){
        
    }
}
