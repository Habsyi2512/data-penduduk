<?php

namespace App\Http\Controllers;

use App\Models\MasterKK;
use App\Models\StatusHubunganKeluarga;
use Illuminate\Http\Request;

class MasterDataController extends Controller
{
    public function getStatusHubungan(){
        $data = StatusHubunganKeluarga::get()->map(function ($item){
            return [
                'id'=>$item->id,
                'name'=>$item->nama_status
            ];
        });
        
        return response()->json([
            'status'=>'success',
            'statusCode'=>200,
            'data' => $data
        ]);
    }

    public function getDetailKKByNoKK($no_kk) {
        $data = MasterKK::with('data_penduduk')->where('no_kk', $no_kk)->first();
    
        if (!$data) {
            return response()->json([
                'message' => 'No KK not found',
                'statusCode' => 404,
            ], 404);
        }
    
        return response()->json([
            'data' => $data,
            'statusCode' => 200,
        ], 200);
    }
    
}
