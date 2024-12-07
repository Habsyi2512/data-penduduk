<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClearTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Daftar tabel yang tidak ingin dihapus
        $excludeTables = ['agamas', 'status_kawins'];  // Misalnya, Anda ingin mengecualikan 'users' dan 'status_kawins'

        // Ambil daftar semua tabel di database
        $tables = DB::select('SHOW TABLES');

        // Loop melalui setiap tabel dan hapus data jika tabel tersebut tidak ada dalam pengecualian
        foreach ($tables as $table) {
            $tableName = $table->{"Tables_in_" . env('DB_DATABASE')};  // Mendapatkan nama tabel

            // Cek jika tabel bukan yang dikecualikan
            if (!in_array($tableName, $excludeTables)) {
                DB::table($tableName)->truncate();  // Menghapus data tabel
            }
        }
    }
}
