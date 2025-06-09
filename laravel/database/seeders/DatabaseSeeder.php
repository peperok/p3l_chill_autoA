<?php

namespace Database\Seeders;

use App\Models\Pembeli;
use App\Models\Organisasi;
use App\Models\Pegawai;
use App\Models\Penitip;
use App\Models\Merch;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create sample Pembeli users
        Pembeli::create([
            'email' => 'pembeli@gmail.com',
            'password' => Hash::make('password123'),
            'nama' => 'Ahmad Pembeli',
            'no_telepon' => '081234567890',
            'tanggal_lahir' => '1990-05-15',
            'jenis_kelamin' => 'Laki-laki',
            'alamat' => 'Jl. Sudirman No. 123, Jakarta',
            'poin' => 100,
            'saldo' => 500000,
            'status' => 'aktif'
        ]);

        // Create sample Organisasi users
        Organisasi::create([
            'email' => 'organisasi@gmail.com',
            'password' => Hash::make('password123'),
            'nama_organisasi' => 'Yayasan Lingkungan Hijau',
            'deskripsi' => 'Organisasi yang fokus pada pelestarian lingkungan',
            'no_telepon' => '0211234567',
            'alamat' => 'Jl. Thamrin No. 45, Jakarta',
            'website' => 'https://lingkunganhijau.org',
            'bidang_kegiatan' => 'Lingkungan',
            'status' => 'aktif'
        ]);

        // Create sample Pegawai users
        Pegawai::create([
            'email' => 'admin@reusemart.com',
            'password' => Hash::make('admin123'),
            'nama' => 'Admin ReuseMART',
            'jabatan' => 'Admin',
            'no_telepon' => '081234567891',
            'alamat' => 'Jl. Admin No. 1, Jakarta',
            'tanggal_bergabung' => '2024-01-01',
            'gaji' => 8000000,
            'status' => 'aktif'
        ]);

        Pegawai::create([
            'email' => 'owner@reusemart.com',
            'password' => Hash::make('owner123'),
            'nama' => 'Owner ReuseMART',
            'jabatan' => 'Owner',
            'no_telepon' => '081234567892',
            'alamat' => 'Jl. Owner No. 1, Jakarta',
            'tanggal_bergabung' => '2023-01-01',
            'gaji' => 15000000,
            'status' => 'aktif'
        ]);

        Pegawai::create([
            'email' => 'cs@reusemart.com',
            'password' => Hash::make('cs123'),
            'nama' => 'Customer Service',
            'jabatan' => 'Customer Service',
            'no_telepon' => '081234567893',
            'alamat' => 'Jl. CS No. 1, Jakarta',
            'tanggal_bergabung' => '2024-02-01',
            'gaji' => 5000000,
            'status' => 'aktif'
        ]);

        Pegawai::create([
            'email' => 'gudang@reusemart.com',
            'password' => Hash::make('gudang123'),
            'nama' => 'Staff Gudang',
            'jabatan' => 'Pegawai Gudang',
            'no_telepon' => '081234567894',
            'alamat' => 'Jl. Gudang No. 1, Jakarta',
            'tanggal_bergabung' => '2024-03-01',
            'gaji' => 4500000,
            'status' => 'aktif'
        ]);

        // Create sample Penitip
        $penitip1 = Penitip::create([
            'nama' => 'Toko Vintage Jakarta',
            'email' => 'vintage@jakarta.com',
            'no_telepon' => '081234567895',
            'alamat' => 'Jl. Vintage No. 10, Jakarta',
            'fee_percentage' => 15.00,
            'status' => 'aktif'
        ]);

        $penitip2 = Penitip::create([
            'nama' => 'Collector Antique',
            'email' => 'antique@collector.com',
            'no_telepon' => '081234567896',
            'alamat' => 'Jl. Antique No. 20, Bandung',
            'fee_percentage' => 12.00,
            'status' => 'aktif'
        ]);

        $penitip3 = Penitip::create([
            'nama' => 'Fashion Reseller Pro',
            'email' => 'penitip@reusemart.com',
            'no_telepon' => '081234567897',
            'alamat' => 'Jl. Fashion No. 30, Surabaya',
            'fee_percentage' => 10.00,
            'status' => 'aktif'
        ]);

        // Create sample Merchandise
        Merch::create([
            'nama_merch' => 'Kemeja Vintage Denim',
            'deskripsi' => 'Kemeja denim vintage dengan kondisi sangat baik, cocok untuk gaya kasual',
            'kategori' => 'Fashion',
            'harga' => 125000,
            'stok' => 3,
            'kondisi' => 'Baik',
            'foto_utama' => 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400',
            'foto_tambahan' => json_encode([
                'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400',
                'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400'
            ]),
            'rating' => 4.5,
            'jumlah_review' => 12,
            'status' => 'aktif',
            'id_penitip' => $penitip1->id
        ]);

        Merch::create([
            'nama_merch' => 'Tas Kulit Vintage',
            'deskripsi' => 'Tas kulit asli dengan desain klasik, masih dalam kondisi sangat baik',
            'kategori' => 'Aksesoris',
            'harga' => 275000,
            'stok' => 2,
            'kondisi' => 'Sangat Baik',
            'foto_utama' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
            'foto_tambahan' => json_encode([
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
            ]),
            'rating' => 4.8,
            'jumlah_review' => 8,
            'status' => 'aktif',
            'id_penitip' => $penitip1->id
        ]);

        Merch::create([
            'nama_merch' => 'Sepatu Sneakers Retro',
            'deskripsi' => 'Sepatu sneakers retro dengan desain ikonik tahun 80an',
            'kategori' => 'Sepatu',
            'harga' => 185000,
            'stok' => 1,
            'kondisi' => 'Baik',
            'foto_utama' => 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
            'foto_tambahan' => json_encode([
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
            ]),
            'rating' => 4.2,
            'jumlah_review' => 15,
            'status' => 'aktif',
            'id_penitip' => $penitip2->id
        ]);

        Merch::create([
            'nama_merch' => 'Jaket Denim Klasik',
            'deskripsi' => 'Jaket denim biru klasik, perfect untuk styling vintage',
            'kategori' => 'Fashion',
            'harga' => 165000,
            'stok' => 4,
            'kondisi' => 'Baik',
            'foto_utama' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
            'foto_tambahan' => json_encode([
                'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'
            ]),
            'rating' => 4.6,
            'jumlah_review' => 20,
            'status' => 'aktif',
            'id_penitip' => $penitip2->id
        ]);

        Merch::create([
            'nama_merch' => 'Kacamata Vintage Frame',
            'deskripsi' => 'Kacamata dengan frame vintage yang unik dan stylish',
            'kategori' => 'Aksesoris',
            'harga' => 95000,
            'stok' => 6,
            'kondisi' => 'Sangat Baik',
            'foto_utama' => 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
            'foto_tambahan' => json_encode([
                'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400'
            ]),
            'rating' => 4.3,
            'jumlah_review' => 9,
            'status' => 'aktif',
            'id_penitip' => $penitip1->id
        ]);
    }
}
