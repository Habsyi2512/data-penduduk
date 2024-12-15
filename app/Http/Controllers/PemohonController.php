<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PemohonController extends Controller
{
    public function index()
    {
        return Inertia::render('Form/DataPermohonan');
    }
}
