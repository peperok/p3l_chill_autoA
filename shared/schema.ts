import { pgTable, text, serial, integer, boolean, timestamp, decimal, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User tables for different roles
export const pembeli = pgTable("pembeli", {
  id: serial("id").primaryKey(),
  nama_pembeli: varchar("nama_pembeli", { length: 255 }).notNull(),
  tlpn_pembeli: varchar("tlpn_pembeli", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  points: integer("points").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const organisasi = pgTable("organisasi", {
  id: serial("id").primaryKey(),
  nama_organisasi: varchar("nama_organisasi", { length: 255 }).notNull(),
  alamat_organisasi: varchar("alamat_organisasi", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pegawai = pgTable("pegawai", {
  id: serial("id").primaryKey(),
  nama_pegawai: varchar("nama_pegawai", { length: 255 }).notNull(),
  jabatan: varchar("jabatan", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  tgl_lahir: timestamp("tgl_lahir").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const penitip = pgTable("penitip", {
  id: serial("id").primaryKey(),
  nama_penitip: varchar("nama_penitip", { length: 255 }).notNull(),
  alamat_penitip: text("alamat_penitip").notNull(),
  tlpn_penitip: varchar("tlpn_penitip", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  ktp_path: text("ktp_path"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Product and inventory tables
export const merch = pgTable("merch", {
  id: serial("id").primaryKey(),
  nama_merch: varchar("nama_merch", { length: 255 }).notNull(),
  deskripsi: text("deskripsi"),
  kategori: varchar("kategori", { length: 100 }),
  harga: decimal("harga", { precision: 10, scale: 2 }).notNull(),
  stok: integer("stok").notNull().default(0),
  kondisi: varchar("kondisi", { length: 50 }),
  foto_utama: text("foto_utama"),
  foto_tambahan: text("foto_tambahan").array(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  jumlah_review: integer("jumlah_review").default(0),
  status: varchar("status", { length: 50 }).default("active"),
  id_penitip: integer("id_penitip").references(() => penitip.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pembelian = pgTable("pembelian", {
  id: serial("id").primaryKey(),
  id_pembeli: integer("id_pembeli").references(() => pembeli.id),
  id_pegawai: integer("id_pegawai").references(() => pegawai.id),
  total_harga: decimal("total_harga", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
  metode_pengiriman: varchar("metode_pengiriman", { length: 100 }),
  alamat_pengiriman: text("alamat_pengiriman"),
  catatan: text("catatan"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const detailPembelian = pgTable("detail_pembelian", {
  id: serial("id").primaryKey(),
  id_pembelian: integer("id_pembelian").references(() => pembelian.id),
  id_merch: integer("id_merch").references(() => merch.id),
  jumlah: integer("jumlah").notNull(),
  harga_satuan: decimal("harga_satuan", { precision: 10, scale: 2 }).notNull(),
});

export const pengiriman = pgTable("pengiriman", {
  id: serial("id").primaryKey(),
  id_pembelian: integer("id_pembelian").references(() => pembelian.id),
  status_pengiriman: varchar("status_pengiriman", { length: 50 }).default("pending"),
  id_pegawai: integer("id_pegawai").references(() => pegawai.id),
  alamat_tujuan: text("alamat_tujuan").notNull(),
  tracking_number: varchar("tracking_number", { length: 100 }),
  estimasi_tiba: timestamp("estimasi_tiba"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const donasi = pgTable("donasi", {
  id: serial("id").primaryKey(),
  id_organisasi: integer("id_organisasi").references(() => organisasi.id),
  judul_donasi: varchar("judul_donasi", { length: 255 }).notNull(),
  deskripsi: text("deskripsi").notNull(),
  target_donasi: decimal("target_donasi", { precision: 10, scale: 2 }),
  donasi_terkumpul: decimal("donasi_terkumpul", { precision: 10, scale: 2 }).default("0"),
  status: varchar("status", { length: 50 }).default("pending"),
  tanggal_mulai: timestamp("tanggal_mulai"),
  tanggal_selesai: timestamp("tanggal_selesai"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const alamat = pgTable("alamat", {
  id: serial("id").primaryKey(),
  id_pembeli: integer("id_pembeli").references(() => pembeli.id),
  nama_alamat: varchar("nama_alamat", { length: 100 }).notNull(),
  alamat_lengkap: text("alamat_lengkap").notNull(),
  kota: varchar("kota", { length: 100 }).notNull(),
  kode_pos: varchar("kode_pos", { length: 10 }).notNull(),
  telepon: varchar("telepon", { length: 20 }),
  is_default: boolean("is_default").default(false),
});

export const notifikasi = pgTable("notifikasi", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(),
  user_type: varchar("user_type", { length: 50 }).notNull(), // 'pembeli', 'organisasi', 'pegawai', etc.
  judul: varchar("judul", { length: 255 }).notNull(),
  pesan: text("pesan").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'order', 'donation', 'consignment', etc.
  is_read: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertPembeliSchema = createInsertSchema(pembeli).omit({
  id: true,
  points: true,
  createdAt: true,
});

export const insertOrganisasiSchema = createInsertSchema(organisasi).omit({
  id: true,
  createdAt: true,
});

export const insertPegawaiSchema = createInsertSchema(pegawai).omit({
  id: true,
  createdAt: true,
});

export const insertMerchSchema = createInsertSchema(merch).omit({
  id: true,
  rating: true,
  jumlah_review: true,
  createdAt: true,
});

export const insertPembelianSchema = createInsertSchema(pembelian).omit({
  id: true,
  createdAt: true,
});

export const insertDonasiSchema = createInsertSchema(donasi).omit({
  id: true,
  donasi_terkumpul: true,
  createdAt: true,
});

export const insertAlamatSchema = createInsertSchema(alamat).omit({
  id: true,
});

// Types
export type Pembeli = typeof pembeli.$inferSelect;
export type InsertPembeli = z.infer<typeof insertPembeliSchema>;

export type Organisasi = typeof organisasi.$inferSelect;
export type InsertOrganisasi = z.infer<typeof insertOrganisasiSchema>;

export type Pegawai = typeof pegawai.$inferSelect;
export type InsertPegawai = z.infer<typeof insertPegawaiSchema>;

export type Penitip = typeof penitip.$inferSelect;

export type Merch = typeof merch.$inferSelect;
export type InsertMerch = z.infer<typeof insertMerchSchema>;

export type Pembelian = typeof pembelian.$inferSelect;
export type InsertPembelian = z.infer<typeof insertPembelianSchema>;

export type Donasi = typeof donasi.$inferSelect;
export type InsertDonasi = z.infer<typeof insertDonasiSchema>;

export type Alamat = typeof alamat.$inferSelect;
export type InsertAlamat = z.infer<typeof insertAlamatSchema>;

export type Notifikasi = typeof notifikasi.$inferSelect;

// Auth types
export type UserRole = 'pembeli' | 'organisasi' | 'admin' | 'penitip' | 'owner' | 'cs' | 'pegawai_gudang';

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  token: string;
};
