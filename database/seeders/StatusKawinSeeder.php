<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusKawinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            ['status' => 'Belum Kawin', 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Kawin Belum Tercatat', 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Kawin Tercatat', 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Cerai Hidup', 'created_at' => now(), 'updated_at' => now()],
            ['status' => 'Cerai Mati', 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('status_kawins')->insert($data);
    }
}
