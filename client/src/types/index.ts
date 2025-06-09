export type UserRole = 'pembeli' | 'organisasi' | 'admin' | 'penitip' | 'owner' | 'cs' | 'pegawai_gudang';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  token: string;
}

export interface Product {
  id: number;
  nama_merch: string;
  deskripsi?: string;
  kategori?: string;
  harga: string;
  stok: number;
  kondisi?: string;
  foto_utama?: string;
  foto_tambahan?: string[];
  rating?: string;
  jumlah_review?: number;
  status?: string;
  id_penitip?: number;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: string;
  quantity: number;
  image?: string;
}

export interface FilterOptions {
  kategori?: string;
  priceMin?: number;
  priceMax?: number;
  kondisi?: string[];
  sortBy?: 'newest' | 'price_low' | 'price_high' | 'rating';
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  pagination?: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
