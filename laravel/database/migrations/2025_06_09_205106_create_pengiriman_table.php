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
        Schema::create('pengiriman', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pembelian')->constrained('pembelian');
            $table->string('metode_pengiriman');
            $table->text('alamat_pengiriman');
            $table->decimal('biaya_pengiriman', 10, 2);
            $table->string('no_resi')->nullable();
            $table->string('status_pengiriman')->default('diproses');
            $table->datetime('tanggal_pengiriman')->nullable();
            $table->datetime('estimasi_tiba')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengiriman');
    }
};
