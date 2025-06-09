-- ReuseMart MySQL Database Dump
-- Generated: 2025-06-09
-- Complete database schema and data export

-- Drop existing tables if they exist
DROP TABLE IF EXISTS pengiriman;
DROP TABLE IF EXISTS detail_pembelian;
DROP TABLE IF EXISTS pembelian;
DROP TABLE IF EXISTS donasi;
DROP TABLE IF EXISTS alamat;
DROP TABLE IF EXISTS notifikasi;
DROP TABLE IF EXISTS merch;
DROP TABLE IF EXISTS penitip;
DROP TABLE IF EXISTS pegawai;
DROP TABLE IF EXISTS organisasi;
DROP TABLE IF EXISTS pembeli;

-- Create pembeli table
CREATE TABLE pembeli (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_pembeli VARCHAR(255) NOT NULL,
    tlpn_pembeli VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create organisasi table
CREATE TABLE organisasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_organisasi VARCHAR(255) NOT NULL,
    alamat_organisasi VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pegawai table
CREATE TABLE pegawai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_pegawai VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    tgl_lahir TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create penitip table
CREATE TABLE penitip (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_penitip VARCHAR(255) NOT NULL,
    alamat_penitip TEXT NOT NULL,
    tlpn_penitip VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create merch table
CREATE TABLE merch (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_merch VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    kategori VARCHAR(100),
    harga DECIMAL(10,2) NOT NULL,
    stok INT NOT NULL,
    kondisi VARCHAR(50),
    foto_utama TEXT,
    foto_tambahan JSON,
    rating DECIMAL(3,2) DEFAULT 0,
    jumlah_review INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    id_penitip INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_penitip) REFERENCES penitip(id)
);

-- Create pembelian table
CREATE TABLE pembelian (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pembeli INT,
    id_pegawai INT,
    total_harga DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    metode_pengiriman VARCHAR(100),
    alamat_pengiriman TEXT,
    catatan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pembeli) REFERENCES pembeli(id),
    FOREIGN KEY (id_pegawai) REFERENCES pegawai(id)
);

-- Create detail_pembelian table
CREATE TABLE detail_pembelian (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pembelian INT,
    id_merch INT,
    jumlah INT NOT NULL,
    harga_satuan DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pembelian) REFERENCES pembelian(id),
    FOREIGN KEY (id_merch) REFERENCES merch(id)
);

-- Create pengiriman table
CREATE TABLE pengiriman (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pembelian INT,
    status_pengiriman VARCHAR(50) DEFAULT 'pending',
    id_pegawai INT,
    alamat_tujuan TEXT NOT NULL,
    tracking_number VARCHAR(100),
    estimasi_tiba TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pembelian) REFERENCES pembelian(id),
    FOREIGN KEY (id_pegawai) REFERENCES pegawai(id)
);

-- Create donasi table
CREATE TABLE donasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_organisasi INT,
    judul_donasi VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    target_donasi DECIMAL(10,2),
    donasi_terkumpul DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    tanggal_mulai TIMESTAMP,
    tanggal_selesai TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_organisasi) REFERENCES organisasi(id)
);

-- Create alamat table
CREATE TABLE alamat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pembeli INT,
    nama_alamat VARCHAR(100) NOT NULL,
    alamat_lengkap TEXT NOT NULL,
    kota VARCHAR(100) NOT NULL,
    kode_pos VARCHAR(10) NOT NULL,
    telepon VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_pembeli) REFERENCES pembeli(id)
);

-- Create notifikasi table
CREATE TABLE notifikasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    user_type VARCHAR(50) NOT NULL,
    judul VARCHAR(255) NOT NULL,
    pesan TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data

-- Insert pembeli data
INSERT INTO pembeli (nama_pembeli, tlpn_pembeli, email, password, points) VALUES
('John Doe', '081234567890', 'john@example.com', 'password123', 100),
('Jane Smith', '081234567891', 'jane@example.com', 'password123', 150),
('Andi Pembeli', '081234567892', 'pembeli@reusemart.com', 'pembeli123', 50);

-- Insert organisasi data
INSERT INTO organisasi (nama_organisasi, alamat_organisasi, email, password) VALUES
('Yayasan Lingkungan Hijau', 'Jl. Thamrin No. 45, Jakarta', 'hijau@example.com', 'password123'),
('Organisasi ReuseMart', 'Jl. Sudirman No. 100, Jakarta', 'organisasi@reusemart.com', 'organisasi123');

-- Insert pegawai data
INSERT INTO pegawai (nama_pegawai, jabatan, email, password, tgl_lahir) VALUES
('Ahmad Rizki', 'Administrator', 'admin@reusemart.com', 'admin123', '1990-05-15'),
('Siti Nurhaliza', 'Pegawai Gudang', 'gudang@reusemart.com', 'gudang123', '1992-08-20'),
('Budi Santoso', 'Customer Service', 'cs@reusemart.com', 'cscscs123', '1988-12-10'),
('Maya Putri', 'Owner', 'owner@reusemart.com', 'owner123', '1985-03-22');

-- Insert merch data
INSERT INTO merch (nama_merch, deskripsi, kategori, harga, stok, kondisi, foto_utama, foto_tambahan, rating, jumlah_review, status) VALUES
('iPhone 12 Pro Max 128GB', 'Kondisi sangat baik, fullset dengan charger original dan box', 'Elektronik', 8500000.00, 2, 'sangat_baik', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '[]', 4.8, 24, 'active'),
('Jaket Kulit Vintage Premium', 'Jaket kulit asli berkualitas tinggi, model klasik vintage', 'Fashion', 250000.00, 5, 'baik', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '[]', 4.5, 16, 'active'),
('Meja Kerja Kayu Vintage', 'Meja kayu solid dengan laci, cocok untuk ruang kerja atau study room', 'Furnitur', 450000.00, 1, 'baik', 'https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '[]', 4.7, 12, 'active'),
('Kamera Analog Klasik', 'Kamera vintage terawat, lengkap dengan lensa dan flash external', 'Elektronik', 750000.00, 3, 'sangat_baik', 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '[]', 4.9, 8, 'active'),
('Koleksi Buku Klasik', 'Set buku klasik vintage dalam kondisi terawat, cocok untuk koleksi', 'Buku & Media', 180000.00, 7, 'baik', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '[]', 4.4, 15, 'active'),
('Tas Kulit Vintage', 'Tas kulit asli design klasik, kondisi prima dan sangat awet', 'Fashion', 320000.00, 4, 'sangat_baik', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '[]', 4.6, 28, 'active'),
('Laptop Asus ROG Gaming', 'Laptop gaming performa tinggi, kondisi terawat dengan cooling pad', 'Elektronik', 12000000.00, 1, 'baik', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '[]', 4.7, 11, 'active'),
('Sepeda Fixie Vintage', 'Sepeda fixie custom build, frame steel berkualitas tinggi', 'Olahraga', 1200000.00, 2, 'sangat_baik', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '[]', 4.8, 19, 'active');

-- Insert sample pembelian data
INSERT INTO pembelian (id_pembeli, id_pegawai, total_harga, status, metode_pengiriman, alamat_pengiriman, catatan) VALUES
(1, 1, 250000.00, 'completed', 'kurir', 'Jl. Sudirman No. 123, Jakarta', 'Mohon dikemas dengan bubble wrap'),
(2, 2, 450000.00, 'pending', 'ambil_sendiri', NULL, NULL);

-- Insert sample pengiriman data
INSERT INTO pengiriman (id_pembelian, status_pengiriman, id_pegawai, alamat_tujuan, tracking_number, estimasi_tiba) VALUES
(1, 'delivered', 1, 'Jl. Sudirman No. 123, Jakarta', 'JNE001234567890', '2024-06-03'),
(2, 'ready_pickup', 2, 'Pickup di toko', NULL, NULL);

-- Authentication credentials summary:
-- Admin: admin@reusemart.com / admin123
-- Warehouse: gudang@reusemart.com / gudang123  
-- Customer Service: cs@reusemart.com / cscscs123
-- Owner: owner@reusemart.com / owner123
-- Customer: pembeli@reusemart.com / pembeli123
-- Organization: organisasi@reusemart.com / organisasi123