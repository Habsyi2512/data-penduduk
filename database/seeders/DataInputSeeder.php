<?php

namespace Database\Seeders;

use App\Models\JenisKelamin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DataInputSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Menonaktifkan foreign key check sementara
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Melakukan truncate pada tabel
        DB::table('jenis_kelamins')->truncate();
        DB::table('agamas')->truncate();
        DB::table('gol_darahs')->truncate();
        DB::table('kewarganegaraans')->truncate();
        DB::table('pekerjaans')->truncate();
        DB::table('status_kawins')->truncate();
        DB::table('status_hubungan_keluargas')->truncate();
        DB::table('jenis_permohonans')->truncate();
        DB::table('status_permohonans')->truncate();

        // Menjalankan seeder lainnya
        $this->call([
            AgamaSeeder::class,
            KelaminSeeder::class,
            GolonganDarahSeeder::class,
            KewarganegaraanSeeder::class,
            PekerjaanSeeder::class,
            StatusKawinSeeder::class,
            JenisPermohonanSeeder::class, 
            StatusPermohonanSeeder::class,
            StatusHubunganKeluargaSeeder::class,
        ]);

        // Mengaktifkan kembali foreign key check
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

    }
}
