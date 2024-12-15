<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GolonganDarahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            ['gol_darah' => 'A'],
            ['gol_darah' => 'B'],
            ['gol_darah' => 'AB'],
            ['gol_darah' => 'O'],
        ];
        DB::table('gol_darahs')->insert($data);
    }
}
