<?php

namespace App\Http\Controllers;

use App\Models\MasterKK;
use App\Models\Pemohon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            $nik = $request->input('nikPemohon');
            DB::table('data_penduduks')
            ->where('nik','=',$nik)
            ->update([
                "no_kk" => $request->input("noKKBaru"),
                "status_hubungan_id" => $request->input("statusHubunganBaru.id"),
                "updated_at" => now()
            ]);

            Pemohon::create([
                "name" => $request->input("namaPemohon"),
                "jenis_permohonan" => 1,
                "status_permohonan" => 3
            ]);

            return to_route('kk.display')->with('success', "Berhasil melakukan perubahan data");
        } catch (ValidationException $e){
            return response()->json([
               'status'=>'error',
               'statusCode'=>422,
               'errors' => $e->errors()
            ], 422);
        }
    }
}
