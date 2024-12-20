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

        // Aktifkan foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('master_kk')->insert([
            'no_kk'=>'2105011803090007',
            'alamat' => 'JL. TANJUNG NO. 35',
            'rt' => '001',
            'rw' => '002',
            'kelurahan_id' => '2105040003',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $data_penduduk = [
            [
                'nik' => '2105012806710001',
                'nama' => 'Muslim',
                'tempat_lahir' => 'Tembilahan',
                'tanggal_lahir' => '1971-06-28',
                'no_kk' => '2105011803090007',
                'kelamin_id' => 1,
                'gol_darah_id' => 2,
                'agama_id' => 1,
                'status_kawin_id' => 3,
                'pekerjaan_id' => 1,
                'kewarganegaraan_id' => 1,
                'status_hubungan_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nik' => '2105012512030001',
                'nama' => 'Muhammad Habsyi Mubarak',
                'tempat_lahir' => 'Tarempa',
                'tanggal_lahir' => '2003-12-25',
                'no_kk' => '2105011803090007',
                'kelamin_id' => 1,
                'gol_darah_id' => 2,
                'agama_id' => 1,
                'status_kawin_id' => 1,
                'pekerjaan_id' => 1,
                'kewarganegaraan_id' => 1,
                'status_hubungan_id' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            ];

        DB::table('data_penduduks')->insert($data_penduduk);


    }
}
