<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelaminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['jenis_kelamin' => 'Laki - laki'],
            ['jenis_kelamin' => 'Perempuan'],
        ];
        DB::table('jenis_kelamins')->insert($data);
    }
}
