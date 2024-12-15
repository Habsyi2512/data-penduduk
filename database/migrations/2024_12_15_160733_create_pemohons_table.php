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
        Schema::create('pemohons', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('jenis_permohonan');
            $table->unsignedBigInteger('status_permohonan');

            $table->foreign('jenis_permohonan')->references('id')->on('jenis_permohonans');
            $table->foreign('status_permohonan')->references('id')->on('status_permohonans');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemohons');
    }
};
