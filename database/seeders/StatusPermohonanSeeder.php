<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusPermohonanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [['status_permohonan' => 'Belum diproses', 'created_at' => now(), 'updated_at' => now()], ['status_permohonan' => 'Diproses', 'created_at' => now(), 'updated_at' => now()]];

        DB::table('status_permohonans')->insert($data);
    }
}
