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
        Schema::create('organisasi', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('nama_organisasi');
            $table->text('deskripsi')->nullable();
            $table->string('no_telepon')->nullable();
            $table->text('alamat')->nullable();
            $table->string('website')->nullable();
            $table->string('bidang_kegiatan')->nullable();
            $table->string('logo')->nullable();
            $table->string('status')->default('aktif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organisasi');
    }
};
