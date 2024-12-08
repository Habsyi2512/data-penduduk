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

        return Inertia::render('Form/DataStatusKawin', ['status_kawin' => $statusKawin]);
    }
}
