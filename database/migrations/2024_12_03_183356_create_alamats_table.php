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
        Schema::create('alamats', function (Blueprint $table) {
            $table->id();
            $table->string('alamat');
            $table->foreignId('kelurahan_id')->constrained(
                table:'villages'
            );
            $table->foreignId('kecamatan_id')->constrained(
                table:'districts'
            );
            $table->foreignId('kabupaten_id')->constrained(
                table:'regencies'
            );
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alamats');
    }
};
