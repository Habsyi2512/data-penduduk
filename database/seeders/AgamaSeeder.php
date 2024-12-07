<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 

class AgamaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            ['agama' => 'Islam'],
            ['agama' => 'Kristen Protestan'],
            ['agama' => 'Kristen Katolik'],
            ['agama' => 'Hindu'],
            ['agama' => 'Buddha'],
            ['agama' => 'Konghucu'],
        ];
        DB::table('agamas')->insert($data);
    }
}
