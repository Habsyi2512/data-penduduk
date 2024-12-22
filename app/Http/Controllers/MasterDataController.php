<?php

namespace App\Http\Controllers;

use App\Models\StatusHubunganKeluarga;
use Illuminate\Http\Request;

class MasterDataController extends Controller
{
    public function getStatusHubungan(){
        $data = StatusHubunganKeluarga::where('id','!=',1)->get()->map(function ($item){
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
}
