import {
  pembeli,
  organisasi,
  pegawai,
  penitip,
  merch,
  pembelian,
  pengiriman,
  type Pembeli,
  type InsertPembeli,
  type Organisasi,
  type InsertOrganisasi,
  type Pegawai,
  type InsertPegawai,
  type Penitip,
  type Merch,
  type InsertMerch,
  type Pembelian,
  type InsertPembelian,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
  constructor() {
    // Database storage - no initialization needed
  }

  // Pembeli methods
  async getPembeli(id: number): Promise<Pembeli | undefined> {
    const [result] = await db.select().from(pembeli).where(eq(pembeli.id, id));
    return result || undefined;
  }

  async getPembeliByEmail(email: string): Promise<Pembeli | undefined> {
    const [result] = await db.select().from(pembeli).where(eq(pembeli.email, email));
    return result || undefined;
  }

  async createPembeli(insertPembeli: InsertPembeli): Promise<Pembeli> {
    const [result] = await db.insert(pembeli).values(insertPembeli).returning();
    return result;
  }

  // Organisasi methods
  async getOrganisasi(id: number): Promise<Organisasi | undefined> {
    const [result] = await db.select().from(organisasi).where(eq(organisasi.id, id));
    return result || undefined;
  }

  async getOrganisasiByEmail(email: string): Promise<Organisasi | undefined> {
    const [result] = await db.select().from(organisasi).where(eq(organisasi.email, email));
    return result || undefined;
  }

  async createOrganisasi(insertOrganisasi: InsertOrganisasi): Promise<Organisasi> {
    const [result] = await db.insert(organisasi).values(insertOrganisasi).returning();
    return result;
  }

  // Pegawai methods
  async getPegawaiById(id: number): Promise<Pegawai | undefined> {
    const [result] = await db.select().from(pegawai).where(eq(pegawai.id, id));
    return result || undefined;
  }

  async getPegawaiByEmail(email: string): Promise<Pegawai | undefined> {
    const [result] = await db.select().from(pegawai).where(eq(pegawai.email, email));
    return result || undefined;
  }

  async getAllPegawai(): Promise<Pegawai[]> {
    const results = await db.select().from(pegawai);
    return results;
  }

  async createPegawai(insertPegawai: InsertPegawai): Promise<Pegawai> {
    const [result] = await db.insert(pegawai).values(insertPegawai).returning();
    return result;
  }

  async updatePegawai(id: number, data: Partial<Pegawai>): Promise<Pegawai> {
    const [result] = await db.update(pegawai).set(data).where(eq(pegawai.id, id)).returning();
    if (!result) {
      throw new Error("Pegawai not found");
    }
    return result;
  }

  async deletePegawai(id: number): Promise<void> {
    await db.delete(pegawai).where(eq(pegawai.id, id));
  }

  // Merch methods
  async getMerchById(id: number): Promise<Merch | undefined> {
    const [result] = await db.select().from(merch).where(eq(merch.id, id));
    return result || undefined;
  }

  async getAllMerch(): Promise<Merch[]> {
    const results = await db.select().from(merch);
    return results;
  }

  async createMerch(insertMerch: InsertMerch): Promise<Merch> {
    const [result] = await db.insert(merch).values(insertMerch).returning();
    return result;
  }

  async updateMerch(id: number, data: Partial<Merch>): Promise<Merch> {
    const [result] = await db.update(merch).set(data).where(eq(merch.id, id)).returning();
    if (!result) {
      throw new Error("Merch not found");
    }
    return result;
  }

  async deleteMerch(id: number): Promise<void> {
    await db.delete(merch).where(eq(merch.id, id));
  }

  // Pembelian methods
  async getPembelianById(id: number): Promise<Pembelian | undefined> {
    const [result] = await db.select().from(pembelian).where(eq(pembelian.id, id));
    return result || undefined;
  }

  async getAllPembelian(): Promise<Pembelian[]> {
    const results = await db.select().from(pembelian);
    return results;
  }

  async createPembelian(insertPembelian: Partial<InsertPembelian>): Promise<Pembelian> {
    const [result] = await db.insert(pembelian).values(insertPembelian as InsertPembelian).returning();
    return result;
  }

  // Pengiriman methods
  async getPengirimanById(id: number): Promise<any> {
    const [result] = await db.select().from(pengiriman).where(eq(pengiriman.id, id));
    return result || undefined;
  }

  async getAllPengiriman(): Promise<any[]> {
    const results = await db.select().from(pengiriman);
    return results;
  }

  async createPengiriman(data: any): Promise<any> {
    const [result] = await db.insert(pengiriman).values(data).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();