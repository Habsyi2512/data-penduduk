<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusHubunganKeluargaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['nama_status' => 'Kepala Keluarga'],
            ['nama_status' => 'Suami'],
            ['nama_status' => 'Istri'],
            ['nama_status' => 'Anak'],
            ['nama_status' => 'Menantu'],
            ['nama_status' => 'Cucu'],
            ['nama_status' => 'Orang Tua'],
            ['nama_status' => 'Mertua'],
            ['nama_status' => 'Famili Lain'],
            ['nama_status' => 'Pembantu Rumah Tangga'],
            ['nama_status' => 'Lainnya'],
        ];
        DB::table('status_hubungan_keluargas')->insert($statuses);
    }
}
