<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestingDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 2105040003 desa tarempa barat
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate tables
        DB::table('data_penduduks')->truncate();
        DB::table('master_kk')->truncate();
        DB::table('alamats')->truncate();

        // Aktifkan foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('alamats')->insert([
            'id'=>1,
            'alamat' => 'JL. TANJUNG NO. 35',
            'kelurahan_id' => '2105040003',
        ]);

        // $data_kk = [
        //     ['no_kk'=>'2105011803090007', 'alamat_id'=>1],
        // ];

        // // loop $data_kk
        // foreach ($data_kk as $value) {
        //     DB::table('master_kk')->insert([
        //         'no_kk' => $value['no_kk'],
        //         'alamat_id' => $value['alamat_id'],
        //     ]);
        // }

        DB::table('master_kk')->insert([
            'no_kk'=>'2105011803090007',
            'alamat_id' => 1,
        ]);


    }
}
