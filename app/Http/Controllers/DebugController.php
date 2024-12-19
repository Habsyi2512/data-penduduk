<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\MasterKK;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DebugController extends Controller
{
    public function index(){
        $data = MasterKK::get();
        return Inertia::render('Debug/Debug', [
            'data'=>$data
        ]);
    }
}
