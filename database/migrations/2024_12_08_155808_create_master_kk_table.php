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
        Schema::create('master_kk', function (Blueprint $table) {
            $table->char('no_kk', 16)->primary();
            $table->unsignedBigInteger('alamat_id');

            $table->foreign('alamat_id')->references('id')->on('alamats');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_kk');
    }
};
