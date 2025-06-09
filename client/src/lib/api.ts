import { apiRequest } from './queryClient';
import type { AuthUser, UserRole, Product, ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = {
  // Auth endpoints
  async loginPembeli(email: string, password: string): Promise<AuthUser> {
    const response = await apiRequest('POST', `${API_BASE_URL}/auth/pembeli/login`, {
      email,
      password,
    });
    const data = await response.json();
    return data.data;
  },

  async registerPembeli(userData: {
    nama: string;
    no_telepon?: string;
    email: string;
    password: string;
    tanggal_lahir?: string;
    jenis_kelamin?: string;
    alamat?: string;
  }): Promise<AuthUser> {
    const response = await apiRequest('POST', `${API_BASE_URL}/auth/pembeli/register`, userData);
    const data = await response.json();
    return data.data;
  },

  async loginOrganisasi(email: string, password: string): Promise<AuthUser> {
    const response = await apiRequest('POST', `${API_BASE_URL}/auth/organisasi/login`, {
      email,
      password,
    });
    const data = await response.json();
    return data.data;
  },

  async registerOrganisasi(userData: {
    nama_organisasi: string;
    alamat?: string;
    email: string;
    password: string;
    no_telepon?: string;
    deskripsi?: string;
    website?: string;
    bidang_kegiatan?: string;
  }): Promise<AuthUser> {
    const response = await apiRequest('POST', `${API_BASE_URL}/auth/organisasi/register`, userData);
    const data = await response.json();
    return data.data;
  },

  async loginPegawai(email: string, password: string): Promise<AuthUser> {
    const response = await apiRequest('POST', `${API_BASE_URL}/auth/pegawai/login`, {
      email,
      password,
    });
    const data = await response.json();
    return data.data;
  },

  async logout(userType: 'pembeli' | 'organisasi' | 'pegawai'): Promise<void> {
    await apiRequest('POST', `${API_BASE_URL}/auth/logout`);
  },

  // Product endpoints
  async getMerch(): Promise<Product[]> {
    const response = await apiRequest('GET', `${API_BASE_URL}/merch`);
    const data = await response.json();
    return data.data;
  },

  async getMerchById(id: number): Promise<Product> {
    const response = await apiRequest('GET', `${API_BASE_URL}/merch/${id}`);
    const data = await response.json();
    return data.data;
  },

  async createMerch(productData: {
    nama_merch: string;
    stok: number;
    deskripsi?: string;
    kategori?: string;
    harga?: string;
    kondisi?: string;
  }): Promise<Product> {
    const response = await apiRequest('POST', `${API_BASE_URL}/merch`, productData);
    const data = await response.json();
    return data.data;
  },

  async updateMerch(id: number, productData: Partial<Product>): Promise<Product> {
    const response = await apiRequest('PUT', `${API_BASE_URL}/merch/${id}`, productData);
    const data = await response.json();
    return data.data;
  },

  async deleteMerch(id: number): Promise<void> {
    await apiRequest('DELETE', `${API_BASE_URL}/merch/${id}`);
  },

  // Purchase endpoints
  async createPembelian(): Promise<{ id: number }> {
    const response = await apiRequest('POST', `${API_BASE_URL}/pembelian`);
    const data = await response.json();
    return data.data;
  },

  async getPembelian(): Promise<any[]> {
    const response = await apiRequest('GET', `${API_BASE_URL}/pembelian`);
    const data = await response.json();
    return data.data;
  },

  async getPembelianById(id: number): Promise<any> {
    const response = await apiRequest('GET', `${API_BASE_URL}/pembelian/${id}`);
    const data = await response.json();
    return data.data;
  },

  // Shipping endpoints
  async getPengiriman(): Promise<any[]> {
    const response = await apiRequest('GET', `${API_BASE_URL}/pengiriman`);
    const data = await response.json();
    return data.data;
  },

  async createPengiriman(shippingData: {
    status_pengiriman: string;
    id_pegawai: string;
    id_alamat: string;
  }): Promise<any> {
    const response = await apiRequest('POST', `${API_BASE_URL}/pengiriman`, shippingData);
    const data = await response.json();
    return data.data;
  },

  // Employee management
  async getPegawai(): Promise<any[]> {
    const response = await apiRequest('GET', `${API_BASE_URL}/pegawai`);
    const data = await response.json();
    return data.data;
  },

  async createPegawai(employeeData: {
    nama_pegawai: string;
    jabatan: string;
    email: string;
    password: string;
    tgl_lahir: string;
  }): Promise<any> {
    const response = await apiRequest('POST', `${API_BASE_URL}/pegawai`, employeeData);
    const data = await response.json();
    return data.data;
  },

  async updatePegawai(id: number, employeeData: any): Promise<any> {
    const response = await apiRequest('PUT', `${API_BASE_URL}/pegawai/${id}`, employeeData);
    const data = await response.json();
    return data.data;
  },

  async deletePegawai(id: number): Promise<void> {
    await apiRequest('DELETE', `${API_BASE_URL}/pegawai/${id}`);
  },

  // Notifications
  async sendNotification(): Promise<void> {
    await apiRequest('GET', `${API_BASE_URL}/notifikasi/kirimKeUser`);
  },

  async updatePembeli(id: number, userData: any): Promise<any> {
    const response = await apiRequest('PUT', `${API_BASE_URL}/pembeli/${id}`, userData);
    return response.json();
  },

  async updateOrganisasi(id: number, userData: any): Promise<any> {
    const response = await apiRequest('PUT', `${API_BASE_URL}/organisasi/${id}`, userData);
    return response.json();
  },

  // Helper method to determine employee role based on jabatan
  determineEmployeeRole(jabatan: string): UserRole {
    const lowercaseJabatan = jabatan.toLowerCase();
    if (lowercaseJabatan.includes('admin')) return 'admin';
    if (lowercaseJabatan.includes('owner')) return 'owner';
    if (lowercaseJabatan.includes('cs') || lowercaseJabatan.includes('customer service')) return 'cs';
    if (lowercaseJabatan.includes('gudang') || lowercaseJabatan.includes('warehouse')) return 'pegawai_gudang';
    return 'pegawai_gudang'; // default fallback
  },
};
