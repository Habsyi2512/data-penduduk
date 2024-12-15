<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisPermohonanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['jenis_permohonan' => 'Pindah KK', 'created_at' => now(), 'updated_at' => now()],
            ['jenis_permohonan' => 'Cetak KK baru', 'created_at' => now(), 'updated_at' => now()],
        ];
        
        DB::table('jenis_permohonans')->insert($data);
       
    }
}
