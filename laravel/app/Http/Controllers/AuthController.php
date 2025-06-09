<?php

namespace App\Http\Controllers;

use App\Models\Pembeli;
use App\Models\Organisasi;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function loginPembeli(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $pembeli = Pembeli::where('email', $request->email)->first();

        if (!$pembeli || !Hash::check($request->password, $pembeli->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = Str::random(60);

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                'id' => $pembeli->id,
                'email' => $pembeli->email,
                'name' => $pembeli->nama,
                'role' => 'pembeli',
                'token' => $token
            ]
        ]);
    }

    public function registerPembeli(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:pembeli,email',
            'password' => 'required|string|min:6',
            'nama' => 'required|string',
            'no_telepon' => 'nullable|string',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|string',
            'alamat' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $pembeli = Pembeli::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nama' => $request->nama,
            'no_telepon' => $request->no_telepon,
            'tanggal_lahir' => $request->tanggal_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'alamat' => $request->alamat,
            'status' => 'aktif'
        ]);

        $token = Str::random(60);

        return response()->json([
            'message' => 'Registration successful',
            'data' => [
                'id' => $pembeli->id,
                'email' => $pembeli->email,
                'name' => $pembeli->nama,
                'role' => 'pembeli',
                'token' => $token
            ]
        ], 201);
    }

    public function loginOrganisasi(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $organisasi = Organisasi::where('email', $request->email)->first();

        if (!$organisasi || !Hash::check($request->password, $organisasi->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = Str::random(60);

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                'id' => $organisasi->id,
                'email' => $organisasi->email,
                'name' => $organisasi->nama_organisasi,
                'role' => 'organisasi',
                'token' => $token
            ]
        ]);
    }

    public function registerOrganisasi(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:organisasi,email',
            'password' => 'required|string|min:6',
            'nama_organisasi' => 'required|string',
            'deskripsi' => 'nullable|string',
            'no_telepon' => 'nullable|string',
            'alamat' => 'nullable|string',
            'website' => 'nullable|string',
            'bidang_kegiatan' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $organisasi = Organisasi::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nama_organisasi' => $request->nama_organisasi,
            'deskripsi' => $request->deskripsi,
            'no_telepon' => $request->no_telepon,
            'alamat' => $request->alamat,
            'website' => $request->website,
            'bidang_kegiatan' => $request->bidang_kegiatan,
            'status' => 'aktif'
        ]);

        $token = Str::random(60);

        return response()->json([
            'message' => 'Registration successful',
            'data' => [
                'id' => $organisasi->id,
                'email' => $organisasi->email,
                'name' => $organisasi->nama_organisasi,
                'role' => 'organisasi',
                'token' => $token
            ]
        ], 201);
    }

    public function loginPegawai(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $pegawai = Pegawai::where('email', $request->email)->first();

        if (!$pegawai || !Hash::check($request->password, $pegawai->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $role = $this->determineEmployeeRole($pegawai->jabatan);
        $token = Str::random(60);

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                'id' => $pegawai->id,
                'email' => $pegawai->email,
                'name' => $pegawai->nama,
                'role' => $role,
                'token' => $token
            ]
        ]);
    }

    private function determineEmployeeRole($jabatan)
    {
        $jabatan = strtolower($jabatan);
        
        if (str_contains($jabatan, 'admin')) return 'admin';
        if (str_contains($jabatan, 'owner')) return 'owner';
        if (str_contains($jabatan, 'cs') || str_contains($jabatan, 'customer service')) return 'cs';
        if (str_contains($jabatan, 'gudang')) return 'pegawai_gudang';
        
        return 'pegawai';
    }

    public function logout(Request $request)
    {
        return response()->json([
            'message' => 'Logout successful'
        ]);
    }
}
