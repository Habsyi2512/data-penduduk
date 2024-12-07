<?php

namespace Database\Seeders;

use App\Models\JenisKelamin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DataInputSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            AgamaSeeder::class,
            KelaminSeeder::class,
            GolonganDarahSeeder::class,
            KewarganegaraanSeeder::class,
            PekerjaanSeeder::class,
            StatusKawinSeeder::class,
        ]);
    }
}
