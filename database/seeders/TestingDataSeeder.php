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
            [
                'no_kk' => '2105011803090007',
                'alamat' => 'JL. TANJUNG NO. 35',
                'rt' => '001',
                'rw' => '002',
                'kelurahan_id' => '2105040003',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'no_kk' => '2171051803090008',
                'alamat' => 'JL. MERDEKA NO. 10',
                'rt' => '003',
                'rw' => '004',
                'kelurahan_id' => '2171051003',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'no_kk' => '2105011803090009',
                'alamat' => 'JL. PANTAI NO. 20',
                'rt' => '005',
                'rw' => '006',
                'kelurahan_id' => '2102040001',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'no_kk' => '2105011803090010',
                'alamat' => 'JL. SEJAHTERA NO. 12',
                'rt' => '007',
                'rw' => '008',
                'kelurahan_id' => '2101010003',
                'created_at' => now(),
                'updated_at' => now()
            ]
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
            [
                'nik' => '2105014703780001',
                'nama' => 'Yusnita',
                'tempat_lahir' => 'Tarempa',
                'tanggal_lahir' => '1978-03-07',
                'no_kk' => '2105011803090007',
                'kelamin_id' => 2,
                'gol_darah_id' => 2,
                'agama_id' => 1,
                'status_kawin_id' => 3,
                'pekerjaan_id' => 5,
                'kewarganegaraan_id' => 1,
                'status_hubungan_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            
                [
                    'nik' => '2105011012010002',
                    'nama' => 'Aliya Putri',
                    'tempat_lahir' => 'Tarempa',
                    'tanggal_lahir' => '1999-07-15',
                    'no_kk' => '2105011803090007',
                    'kelamin_id' => 2,
                    'gol_darah_id' => 1,
                    'agama_id' => 2,
                    'status_kawin_id' => 2,
                    'pekerjaan_id' => 2,
                    'kewarganegaraan_id' => 1,
                    'status_hubungan_id' => 2,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'nik' => '2105011012010003',
                    'nama' => 'Budi Santoso',
                    'tempat_lahir' => 'Tarempa',
                    'tanggal_lahir' => '1985-04-10',
                    'no_kk' => '2105011803090007',
                    'kelamin_id' => 1,
                    'gol_darah_id' => 3,
                    'agama_id' => 1,
                    'status_kawin_id' => 1,
                    'pekerjaan_id' => 3,
                    'kewarganegaraan_id' => 1,
                    'status_hubungan_id' => 1,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'nik' => '2105011012010004',
                    'nama' => 'Siti Nurhaliza',
                    'tempat_lahir' => 'Tarempa',
                    'tanggal_lahir' => '1992-06-22',
                    'no_kk' => '2105011803090007',
                    'kelamin_id' => 2,
                    'gol_darah_id' => 2,
                    'agama_id' => 1,
                    'status_kawin_id' => 2,
                    'pekerjaan_id' => 1,
                    'kewarganegaraan_id' => 1,
                    'status_hubungan_id' => 3,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'nik' => '2105011012010005',
                    'nama' => 'Rudi Gunawan',
                    'tempat_lahir' => 'Tarempa',
                    'tanggal_lahir' => '1990-01-30',
                    'no_kk' => '2105011803090007',
                    'kelamin_id' => 1,
                    'gol_darah_id' => 4,
                    'agama_id' => 3,
                    'status_kawin_id' => 1,
                    'pekerjaan_id' => 2,
                    'kewarganegaraan_id' => 1,
                    'status_hubungan_id' => 4,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'nik' => '2105011012010006',
                    'nama' => 'Diana Putri',
                    'tempat_lahir' => 'Tarempa',
                    'tanggal_lahir' => '1995-09-11',
                    'no_kk' => '2105011803090007',
                    'kelamin_id' => 2,
                    'gol_darah_id' => 1,
                    'agama_id' => 2,
                    'status_kawin_id' => 1,
                    'pekerjaan_id' => 4,
                    'kewarganegaraan_id' => 1,
                    'status_hubungan_id' => 2,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'nik' => '2105011012010007',
                    'nama' => 'Fajar Nugraha',
                    'tempat_lahir' => 'Tarempa',
                    'tanggal_lahir' => '1988-02-28',
                    'no_kk' => '2105011803090007',
                    'kelamin_id' => 1,
                    'gol_darah_id' => 2,
                    'agama_id' => 1,
                    'status_kawin_id' => 2,
                    'pekerjaan_id' => 5,
                    'kewarganegaraan_id' => 1,
                    'status_hubungan_id' => 3,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'nik' => '2105011012010008',
                    'nama' => 'Rika Susanti',
                    'tempat_lahir' => 'Tarempa',
                    'tanggal_lahir' => '1993-03-18',
                    'no_kk' => '2105011803090007',
                    'kelamin_id' => 2,
                    'gol_darah_id' => 3,
                    'agama_id' => 2,
                    'status_kawin_id' => 1,
                    'pekerjaan_id' => 6,
                    'kewarganegaraan_id' => 1,
                    'status_hubungan_id' => 4,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'nik' => '2105011012010009',
                    'nama' => 'Wahyu Setiawan',
                    'tempat_lahir' => 'Tarempa',
                    'tanggal_lahir' => '1996-12-05',
                    'no_kk' => '2105011803090007',
                    'kelamin_id' => 1,
                    'gol_darah_id' => 1,
                    'agama_id' => 3,
                    'status_kawin_id' => 1,
                    'pekerjaan_id' => 3,
                    'kewarganegaraan_id' => 1,
                    'status_hubungan_id' => 2,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'nik' => '2105011012010010',
                    'nama' => 'Eva Melinda',
                    'tempat_lahir' => 'Tarempa',
                    'tanggal_lahir' => '2000-05-23',
                    'no_kk' => '2105011803090007',
                    'kelamin_id' => 2,
                    'gol_darah_id' => 4,
                    'agama_id' => 1,
                    'status_kawin_id' => 2,
                    'pekerjaan_id' => 2,
                    'kewarganegaraan_id' => 1,
                    'status_hubungan_id' => 3,
                    'created_at' => now(),
                    'updated_at' => now()
                ]
            
            ];

        DB::table('data_penduduks')->insert($data_penduduk);


    }
}
