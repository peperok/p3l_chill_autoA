import { db } from "./db";
import {
  pembeli,
  organisasi,
  pegawai,
  merch,
  pembelian,
  pengiriman,
} from "@shared/schema";

export async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Clear existing data
    await db.delete(pengiriman);
    await db.delete(pembelian);
    await db.delete(merch);
    await db.delete(pegawai);
    await db.delete(organisasi);
    await db.delete(pembeli);

    // Insert sample pembeli and get IDs
    const samplePembeli = [
      {
        nama_pembeli: "John Doe",
        tlpn_pembeli: "081234567890",
        email: "john@example.com",
        password: "password123",
        points: 100,
      },
      {
        nama_pembeli: "Jane Smith",
        tlpn_pembeli: "081234567891",
        email: "jane@example.com",
        password: "password123",
        points: 150,
      },
      {
        nama_pembeli: "Andi Pembeli",
        tlpn_pembeli: "081234567892",
        email: "pembeli@reusemart.com",
        password: "pembeli123",
        points: 50,
      },
    ];

    const insertedPembeli = await db.insert(pembeli).values(samplePembeli).returning();

    // Insert sample organisasi
    const sampleOrganisasi = [
      {
        nama_organisasi: "Yayasan Lingkungan Hijau",
        alamat_organisasi: "Jl. Thamrin No. 45, Jakarta",
        email: "hijau@example.com",
        password: "password123",
      },
      {
        nama_organisasi: "Organisasi ReuseMart",
        alamat_organisasi: "Jl. Sudirman No. 100, Jakarta",
        email: "organisasi@reusemart.com",
        password: "organisasi123",
      },
    ];

    const insertedOrganisasi = await db.insert(organisasi).values(sampleOrganisasi).returning();

    // Insert sample pegawai
    const samplePegawai = [
      {
        nama_pegawai: "Ahmad Rizki",
        jabatan: "Administrator",
        email: "admin@reusemart.com",
        password: "admin123",
        tgl_lahir: new Date("1990-05-15"),
      },
      {
        nama_pegawai: "Siti Nurhaliza",
        jabatan: "Pegawai Gudang",
        email: "gudang@reusemart.com",
        password: "gudang123",
        tgl_lahir: new Date("1992-08-20"),
      },
      {
        nama_pegawai: "Budi Santoso",
        jabatan: "Customer Service",
        email: "cs@reusemart.com",
        password: "cscscs123",
        tgl_lahir: new Date("1988-12-10"),
      },
      {
        nama_pegawai: "Maya Putri",
        jabatan: "Owner",
        email: "owner@reusemart.com",
        password: "owner123",
        tgl_lahir: new Date("1985-03-22"),
      },
    ];

    const insertedPegawai = await db.insert(pegawai).values(samplePegawai).returning();

    // Insert sample merch
    const sampleMerch = [
      {
        nama_merch: "iPhone 12 Pro Max 128GB",
        deskripsi: "Kondisi sangat baik, fullset dengan charger original dan box",
        kategori: "Elektronik",
        harga: "8500000",
        stok: 2,
        kondisi: "sangat_baik",
        foto_utama: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        foto_tambahan: [],
        rating: "4.8",
        jumlah_review: 24,
        status: "active",
      },
      {
        nama_merch: "Jaket Kulit Vintage Premium",
        deskripsi: "Jaket kulit asli berkualitas tinggi, model klasik vintage",
        kategori: "Fashion",
        harga: "250000",
        stok: 5,
        kondisi: "baik",
        foto_utama: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        foto_tambahan: [],
        rating: "4.5",
        jumlah_review: 16,
        status: "active",
      },
      {
        nama_merch: "Meja Kerja Kayu Vintage",
        deskripsi: "Meja kayu solid dengan laci, cocok untuk ruang kerja atau study room",
        kategori: "Furnitur",
        harga: "450000",
        stok: 1,
        kondisi: "baik",
        foto_utama: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        foto_tambahan: [],
        rating: "4.7",
        jumlah_review: 12,
        status: "active",
      },
      {
        nama_merch: "Kamera Analog Klasik",
        deskripsi: "Kamera vintage terawat, lengkap dengan lensa dan flash external",
        kategori: "Elektronik",
        harga: "750000",
        stok: 3,
        kondisi: "sangat_baik",
        foto_utama: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        foto_tambahan: [],
        rating: "4.9",
        jumlah_review: 8,
        status: "active",
      },
      {
        nama_merch: "Koleksi Buku Klasik",
        deskripsi: "Set buku klasik vintage dalam kondisi terawat, cocok untuk koleksi",
        kategori: "Buku & Media",
        harga: "180000",
        stok: 7,
        kondisi: "baik",
        foto_utama: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        foto_tambahan: [],
        rating: "4.4",
        jumlah_review: 15,
        status: "active",
      },
      {
        nama_merch: "Tas Kulit Vintage",
        deskripsi: "Tas kulit asli design klasik, kondisi prima dan sangat awet",
        kategori: "Fashion",
        harga: "320000",
        stok: 4,
        kondisi: "sangat_baik",
        foto_utama: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        foto_tambahan: [],
        rating: "4.6",
        jumlah_review: 28,
        status: "active",
      },
      {
        nama_merch: "Laptop Asus ROG Gaming",
        deskripsi: "Laptop gaming performa tinggi, kondisi terawat dengan cooling pad",
        kategori: "Elektronik",
        harga: "12000000",
        stok: 1,
        kondisi: "baik",
        foto_utama: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        foto_tambahan: [],
        rating: "4.7",
        jumlah_review: 11,
        status: "active",
      },
      {
        nama_merch: "Sepeda Fixie Vintage",
        deskripsi: "Sepeda fixie custom build, frame steel berkualitas tinggi",
        kategori: "Olahraga",
        harga: "1200000",
        stok: 2,
        kondisi: "sangat_baik",
        foto_utama: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        foto_tambahan: [],
        rating: "4.8",
        jumlah_review: 19,
        status: "active",
      },
    ];

    const insertedMerch = await db.insert(merch).values(sampleMerch).returning();

    // Insert sample pembelian using actual IDs
    const samplePembelian = [
      {
        id_pembeli: insertedPembeli[0].id,
        id_pegawai: insertedPegawai[0].id,
        total_harga: "250000",
        status: "completed",
        metode_pengiriman: "kurir",
        alamat_pengiriman: "Jl. Sudirman No. 123, Jakarta",
        catatan: "Mohon dikemas dengan bubble wrap",
      },
      {
        id_pembeli: insertedPembeli[1].id,
        id_pegawai: insertedPegawai[1].id,
        total_harga: "450000",
        status: "pending",
        metode_pengiriman: "ambil_sendiri",
        alamat_pengiriman: null,
        catatan: null,
      },
    ];

    const insertedPembelian = await db.insert(pembelian).values(samplePembelian).returning();

    // Insert sample pengiriman using actual IDs
    const samplePengiriman = [
      {
        id_pembelian: insertedPembelian[0].id,
        status_pengiriman: "delivered",
        id_pegawai: insertedPegawai[0].id,
        alamat_tujuan: "Jl. Sudirman No. 123, Jakarta",
        tracking_number: "JNE001234567890",
        estimasi_tiba: new Date("2024-06-03"),
      },
      {
        id_pembelian: insertedPembelian[1].id,
        status_pengiriman: "ready_pickup",
        id_pegawai: insertedPegawai[1].id,
        alamat_tujuan: "Pickup di toko",
        tracking_number: null,
        estimasi_tiba: null,
      },
    ];

    await db.insert(pengiriman).values(samplePengiriman);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}