<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DebugController extends Controller
{
    public function index(){
        return Inertia::render('Debug/Debug');
    }
}
