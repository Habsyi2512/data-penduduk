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
            $table->string('alamat');
            $table->string('rt');
            $table->string('rw');
            $table->char('kelurahan_id', 10)->collation('utf8_unicode_ci');

            $table->foreign('kelurahan_id')->references('id')->on('villages')->onDelete('cascade');
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
