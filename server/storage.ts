import { 
  pembeli, organisasi, pegawai, merch, pembelian, pengiriman, penitip,
  type Pembeli, type InsertPembeli,
  type Organisasi, type InsertOrganisasi,
  type Pegawai, type InsertPegawai,
  type Merch, type InsertMerch,
  type Pembelian, type InsertPembelian,
  type Penitip
} from "@shared/schema";

export interface IStorage {
  // Pembeli methods
  getPembeli(id: number): Promise<Pembeli | undefined>;
  getPembeliByEmail(email: string): Promise<Pembeli | undefined>;
  createPembeli(pembeli: InsertPembeli): Promise<Pembeli>;

  // Organisasi methods
  getOrganisasi(id: number): Promise<Organisasi | undefined>;
  getOrganisasiByEmail(email: string): Promise<Organisasi | undefined>;
  createOrganisasi(organisasi: InsertOrganisasi): Promise<Organisasi>;

  // Pegawai methods
  getPegawaiById(id: number): Promise<Pegawai | undefined>;
  getPegawaiByEmail(email: string): Promise<Pegawai | undefined>;
  getAllPegawai(): Promise<Pegawai[]>;
  createPegawai(pegawai: InsertPegawai): Promise<Pegawai>;
  updatePegawai(id: number, data: Partial<Pegawai>): Promise<Pegawai>;
  deletePegawai(id: number): Promise<void>;

  // Merch methods
  getMerchById(id: number): Promise<Merch | undefined>;
  getAllMerch(): Promise<Merch[]>;
  createMerch(merch: InsertMerch): Promise<Merch>;
  updateMerch(id: number, data: Partial<Merch>): Promise<Merch>;
  deleteMerch(id: number): Promise<void>;

  // Pembelian methods
  getPembelianById(id: number): Promise<Pembelian | undefined>;
  getAllPembelian(): Promise<Pembelian[]>;
  createPembelian(pembelian: Partial<InsertPembelian>): Promise<Pembelian>;

  // Pengiriman methods
  getPengirimanById(id: number): Promise<any>;
  getAllPengiriman(): Promise<any[]>;
  createPengiriman(pengiriman: any): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  private pembeli: Map<number, Pembeli>;
  private organisasi: Map<number, Organisasi>;
  private pegawai: Map<number, Pegawai>;
  private merch: Map<number, Merch>;
  private pembelian: Map<number, Pembelian>;
  private pengiriman: Map<number, any>;
  private penitip: Map<number, Penitip>;
  
  private currentPembeliId: number;
  private currentOrganisasiId: number;
  private currentPegawaiId: number;
  private currentMerchId: number;
  private currentPembelianId: number;
  private currentPengirimanId: number;
  private currentPenitipId: number;

  constructor() {
    this.pembeli = new Map();
    this.organisasi = new Map();
    this.pegawai = new Map();
    this.merch = new Map();
    this.pembelian = new Map();
    this.pengiriman = new Map();
    this.penitip = new Map();
    
    this.currentPembeliId = 1;
    this.currentOrganisasiId = 1;
    this.currentPegawaiId = 1;
    this.currentMerchId = 1;
    this.currentPembelianId = 1;
    this.currentPengirimanId = 1;
    this.currentPenitipId = 1;

    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample employees
    const samplePegawai = [
      {
        id: this.currentPegawaiId++,
        nama_pegawai: "Ahmad Rizki",
        jabatan: "Administrator",
        email: "admin@reusemart.com",
        password: "admin123",
        tgl_lahir: new Date("1990-05-15"),
        createdAt: new Date(),
      },
      {
        id: this.currentPegawaiId++,
        nama_pegawai: "Siti Nurhaliza",
        jabatan: "Pegawai Gudang",
        email: "gudang@reusemart.com",
        password: "gudang123",
        tgl_lahir: new Date("1992-08-20"),
        createdAt: new Date(),
      },
      {
        id: this.currentPegawaiId++,
        nama_pegawai: "Budi Santoso",
        jabatan: "Customer Service",
        email: "cs@reusemart.com",
        password: "cs123",
        tgl_lahir: new Date("1988-12-10"),
        createdAt: new Date(),
      }
    ];

    samplePegawai.forEach(pegawai => {
      this.pegawai.set(pegawai.id, pegawai);
    });

    // Sample products
    const sampleMerch = [
      {
        id: this.currentMerchId++,
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
        id_penitip: null,
        createdAt: new Date(),
      },
      {
        id: this.currentMerchId++,
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
        id_penitip: null,
        createdAt: new Date(),
      },
      {
        id: this.currentMerchId++,
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
        id_penitip: null,
        createdAt: new Date(),
      },
      {
        id: this.currentMerchId++,
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
        id_penitip: null,
        createdAt: new Date(),
      },
      {
        id: this.currentMerchId++,
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
        id_penitip: null,
        createdAt: new Date(),
      },
      {
        id: this.currentMerchId++,
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
        id_penitip: null,
        createdAt: new Date(),
      }
    ];

    sampleMerch.forEach(merch => {
      this.merch.set(merch.id, merch);
    });

    // Sample purchases
    const samplePembelian = [
      {
        id: this.currentPembelianId++,
        id_pembeli: 1,
        id_pegawai: 1,
        total_harga: "250000",
        status: "completed",
        metode_pengiriman: "kurir",
        alamat_pengiriman: "Jl. Sudirman No. 123, Jakarta",
        catatan: "Mohon dikemas dengan bubble wrap",
        createdAt: new Date(),
      },
      {
        id: this.currentPembelianId++,
        id_pembeli: 2,
        id_pegawai: 2,
        total_harga: "450000",
        status: "pending",
        metode_pengiriman: "ambil_sendiri",
        alamat_pengiriman: null,
        catatan: null,
        createdAt: new Date(),
      },
      {
        id: this.currentPembelianId++,
        id_pembeli: 1,
        id_pegawai: 1,
        total_harga: "8500000",
        status: "completed",
        metode_pengiriman: "kurir",
        alamat_pengiriman: "Jl. Merdeka No. 456, Bandung",
        catatan: "Harap periksa kondisi sebelum dikirim",
        createdAt: new Date(),
      }
    ];

    samplePembelian.forEach(pembelian => {
      this.pembelian.set(pembelian.id, pembelian);
    });
  }

  // Pembeli methods
  async getPembeli(id: number): Promise<Pembeli | undefined> {
    return this.pembeli.get(id);
  }

  async getPembeliByEmail(email: string): Promise<Pembeli | undefined> {
    return Array.from(this.pembeli.values()).find(
      (pembeli) => pembeli.email === email
    );
  }

  async createPembeli(insertPembeli: InsertPembeli): Promise<Pembeli> {
    const id = this.currentPembeliId++;
    const pembeli: Pembeli = {
      ...insertPembeli,
      id,
      points: 0,
      createdAt: new Date(),
    };
    this.pembeli.set(id, pembeli);
    return pembeli;
  }

  // Organisasi methods
  async getOrganisasi(id: number): Promise<Organisasi | undefined> {
    return this.organisasi.get(id);
  }

  async getOrganisasiByEmail(email: string): Promise<Organisasi | undefined> {
    return Array.from(this.organisasi.values()).find(
      (organisasi) => organisasi.email === email
    );
  }

  async createOrganisasi(insertOrganisasi: InsertOrganisasi): Promise<Organisasi> {
    const id = this.currentOrganisasiId++;
    const organisasi: Organisasi = {
      ...insertOrganisasi,
      id,
      createdAt: new Date(),
    };
    this.organisasi.set(id, organisasi);
    return organisasi;
  }

  // Pegawai methods
  async getPegawaiById(id: number): Promise<Pegawai | undefined> {
    return this.pegawai.get(id);
  }

  async getPegawaiByEmail(email: string): Promise<Pegawai | undefined> {
    return Array.from(this.pegawai.values()).find(
      (pegawai) => pegawai.email === email
    );
  }

  async getAllPegawai(): Promise<Pegawai[]> {
    return Array.from(this.pegawai.values());
  }

  async createPegawai(insertPegawai: InsertPegawai): Promise<Pegawai> {
    const id = this.currentPegawaiId++;
    const pegawai: Pegawai = {
      ...insertPegawai,
      id,
      tgl_lahir: new Date(insertPegawai.tgl_lahir),
      createdAt: new Date(),
    };
    this.pegawai.set(id, pegawai);
    return pegawai;
  }

  async updatePegawai(id: number, data: Partial<Pegawai>): Promise<Pegawai> {
    const existingPegawai = this.pegawai.get(id);
    if (!existingPegawai) {
      throw new Error('Employee not found');
    }

    const updatedPegawai = {
      ...existingPegawai,
      ...data,
      id, // Ensure ID doesn't change
    };

    this.pegawai.set(id, updatedPegawai);
    return updatedPegawai;
  }

  async deletePegawai(id: number): Promise<void> {
    if (!this.pegawai.has(id)) {
      throw new Error('Employee not found');
    }
    this.pegawai.delete(id);
  }

  // Merch methods
  async getMerchById(id: number): Promise<Merch | undefined> {
    return this.merch.get(id);
  }

  async getAllMerch(): Promise<Merch[]> {
    return Array.from(this.merch.values());
  }

  async createMerch(insertMerch: InsertMerch): Promise<Merch> {
    const id = this.currentMerchId++;
    const merch: Merch = {
      id,
      nama_merch: insertMerch.nama_merch,
      deskripsi: insertMerch.deskripsi ?? null,
      kategori: insertMerch.kategori ?? null,
      harga: insertMerch.harga || "0",
      stok: insertMerch.stok ?? 0,
      kondisi: insertMerch.kondisi ?? null,
      foto_utama: insertMerch.foto_utama ?? null,
      rating: "0",
      jumlah_review: 0,
      status: "active",
      foto_tambahan: [],
      id_penitip: insertMerch.id_penitip ?? null,
      createdAt: new Date(),
    };
    this.merch.set(id, merch);
    return merch;
  }

  async updateMerch(id: number, data: Partial<Merch>): Promise<Merch> {
    const existingMerch = this.merch.get(id);
    if (!existingMerch) {
      throw new Error('Product not found');
    }

    const updatedMerch = {
      ...existingMerch,
      ...data,
      id, // Ensure ID doesn't change
    };

    this.merch.set(id, updatedMerch);
    return updatedMerch;
  }

  async deleteMerch(id: number): Promise<void> {
    if (!this.merch.has(id)) {
      throw new Error('Product not found');
    }
    this.merch.delete(id);
  }

  // Pembelian methods
  async getPembelianById(id: number): Promise<Pembelian | undefined> {
    return this.pembelian.get(id);
  }

  async getAllPembelian(): Promise<Pembelian[]> {
    return Array.from(this.pembelian.values());
  }

  async createPembelian(insertPembelian: Partial<InsertPembelian>): Promise<Pembelian> {
    const id = this.currentPembelianId++;
    const pembelian: Pembelian = {
      id,
      id_pembeli: insertPembelian.id_pembeli || null,
      id_pegawai: insertPembelian.id_pegawai || null,
      total_harga: insertPembelian.total_harga || "0",
      status: insertPembelian.status || "pending",
      metode_pengiriman: insertPembelian.metode_pengiriman || null,
      alamat_pengiriman: insertPembelian.alamat_pengiriman || null,
      catatan: insertPembelian.catatan || null,
      createdAt: new Date(),
    };
    this.pembelian.set(id, pembelian);
    return pembelian;
  }

  // Pengiriman methods
  async getPengirimanById(id: number): Promise<any> {
    return this.pengiriman.get(id);
  }

  async getAllPengiriman(): Promise<any[]> {
    return Array.from(this.pengiriman.values());
  }

  async createPengiriman(data: any): Promise<any> {
    const id = this.currentPengirimanId++;
    const pengiriman = {
      id,
      ...data,
      createdAt: new Date(),
    };
    this.pengiriman.set(id, pengiriman);
    return pengiriman;
  }
}

export const storage = new MemStorage();
