<?php

namespace App\Http\Controllers;

use App\Models\MasterKK;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PindahKKController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('PindahKK');
    }

    public function update(Request $request){
        try{
            $data = $request->validate([
                'nikPemohon' => 'required',
                'namaPemohon' => 'required',
                'noKKLama' => 'required',
                'noKKBaru' => 'required',
                'statusHubunganLama.id' => 'required',
                'statusHubunganLama.name' => 'required',
                'statusHubunganBaru.id' => 'required',
                'statusHubunganBaru.name' => 'required',
            ]);
            dd($data);
        } catch (ValidationException $e){
            return response()->json([
               'status'=>'error',
               'statusCode'=>422,
               'errors' => $e->errors()
            ], 422);
        }
    }
}
