<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class MasterKK extends Model
{
    //
    protected $table = 'master_kk';
    protected $fillable = ['no_kk', 'alamat_id'];

    public function data_penduduk(){
        return $this->hasMany(DataPenduduk::class, 'no_kk', 'no_kk');
    }
    
    public function alamat(){
        return $this->belongsTo(Alamat::class, 'alamat_id', 'id');
    }

//     public function scopeFilter(Builder $query)
// {
//     if ($kabupatenId = request('kabupaten')) {
//         $query->whereHas('alamat.village.district.regency', function ($query) use ($kabupatenId) {
//             $query->where('id', $kabupatenId);
//         });
//     }
// }

// Di dalam Model MasterKK
    public function scopeFilter(Builder $query, array $filters){
        // Filter berdasarkan kabupaten
        if (!empty($filters['kabupaten'])) {
            $query->whereHas('alamat.village.district.regency', function ($query) use ($filters) {
                $query->where('id', $filters['kabupaten']);
            });
        }

        // Filter berdasarkan no_kk
        if (!empty($filters['no_kk'])) {
            $query->where('no_kk', 'like', '%' . $filters['no_kk'] . '%');
        }

        // Tambahkan filter lainnya jika diperlukan

        return $query;
    }

}
