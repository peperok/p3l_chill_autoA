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
        Schema::create('merch', function (Blueprint $table) {
            $table->id();
            $table->string('nama_merch');
            $table->text('deskripsi')->nullable();
            $table->string('kategori')->nullable();
            $table->decimal('harga', 15, 2);
            $table->integer('stok');
            $table->string('kondisi')->nullable();
            $table->string('foto_utama')->nullable();
            $table->json('foto_tambahan')->nullable();
            $table->decimal('rating', 3, 2)->nullable();
            $table->integer('jumlah_review')->default(0);
            $table->string('status')->default('aktif');
            $table->unsignedBigInteger('id_penitip')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merch');
    }
};
