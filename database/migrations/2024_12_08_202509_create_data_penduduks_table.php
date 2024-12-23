<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('data_penduduks')) {
        Schema::create('data_penduduks', function (Blueprint $table) {
            $table->char('nik', 16)->primary();
            $table->string('nama');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->char('no_kk', 16);
            $table->unsignedBigInteger('kelamin_id');
            $table->unsignedBigInteger('gol_darah_id');
            $table->unsignedBigInteger('agama_id');
            $table->unsignedBigInteger('status_kawin_id');
            $table->unsignedBigInteger('pekerjaan_id');
            $table->unsignedBigInteger('kewarganegaraan_id');
            $table->unsignedBigInteger('status_hubungan_id');
            $table->softDeletesTz('deleted_at', precision: 0);
            
            $table->foreign('kelamin_id')->references('id')->on('jenis_kelamins');
            $table->foreign('gol_darah_id')->references('id')->on('gol_darahs');
            $table->foreign('agama_id')->references('id')->on('agamas');
            $table->foreign('status_kawin_id')->references('id')->on('status_kawins');
            $table->foreign('pekerjaan_id')->references('id')->on('pekerjaans');
            $table->foreign('kewarganegaraan_id')->references('id')->on('kewarganegaraans');
            $table->foreign('status_hubungan_id')->references('id')->on('status_hubungan_keluargas');
            $table->foreign('no_kk')->references('no_kk')->on('master_kk')->onDelete('cascade'); // Relasi dengan master_kk
            
            $table->timestamps();
            });
        }
        

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_penduduks');
    }
};