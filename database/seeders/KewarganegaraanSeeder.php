<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KewarganegaraanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['kewarganegaraan' => 'WNI'],
            ['kewarganegaraan' => 'WNA'],
        ];

        DB::table('kewarganegaraans')->insert($data);
    }
}
