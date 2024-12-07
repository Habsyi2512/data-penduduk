<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PendudukFormController extends Controller
{
    public function index(){
        return Inertia::render('Form/AddPenduduk');
    }
}
