<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MerchController;
use App\Http\Controllers\PembelianController;
use App\Http\Controllers\PengirimanController;
use App\Http\Controllers\PegawaiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/pembeli/login', [AuthController::class, 'loginPembeli']);
    Route::post('/pembeli/register', [AuthController::class, 'registerPembeli']);
    Route::post('/organisasi/login', [AuthController::class, 'loginOrganisasi']);
    Route::post('/organisasi/register', [AuthController::class, 'registerOrganisasi']);
    Route::post('/pegawai/login', [AuthController::class, 'loginPegawai']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Merchandise routes
Route::apiResource('merch', MerchController::class);

// Purchase routes
Route::apiResource('pembelian', PembelianController::class);

// Shipping routes
Route::apiResource('pengiriman', PengirimanController::class);

// Employee routes
Route::apiResource('pegawai', PegawaiController::class);

// Additional specific routes
Route::post('/notifications', function() {
    return response()->json(['message' => 'Notification sent successfully']);
});

Route::put('/pembeli/{id}', function($id, Request $request) {
    return response()->json(['message' => 'Pembeli updated successfully']);
});

Route::put('/organisasi/{id}', function($id, Request $request) {
    return response()->json(['message' => 'Organisasi updated successfully']);
});