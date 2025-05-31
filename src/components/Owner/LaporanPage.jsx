import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const laporanList = [
  "Penjualan Bulanan Keseluruhan",
  "Laporan Komisi Bulanan per Produk",
  "Laporan Stok Gudang",
  "Laporan Penjualan per Kategori Barang",
  "Laporan Barang Masa Penitipan Habis",
  "Laporan Donasi Barang",
  "Laporan Request Donasi",
  "Laporan Transaksi Penitip",
];

const dummyData = {
  "Penjualan Bulanan Keseluruhan": {
    columns: ["Bulan", "Total Penjualan"],
    rows: [
      ["Januari", "1000"],
      ["Februari", "1500"],
    ],
  },
  "Laporan Komisi Bulanan per Produk": {
    columns: ["Produk", "Bulan", "Komisi"],
    rows: [
      ["Produk A", "Januari", "100"],
      ["Produk B", "Februari", "150"],
    ],
  },
  "Laporan Stok Gudang": {
    columns: ["Barang", "Jumlah Stok"],
    rows: [
      ["Baju", "20"],
      ["Sepatu", "10"],
    ],
  },
  "Laporan Penjualan per Kategori Barang": {
    columns: ["Kategori", "Total Penjualan"],
    rows: [
      ["Pakaian", "2000"],
      ["Mainan", "1000"],
    ],
  },
  "Laporan Barang Masa Penitipan Habis": {
    columns: ["Barang", "Tanggal Habis"],
    rows: [
      ["Baju", "2025-05-01"],
      ["Mainan", "2025-04-15"],
    ],
  },
  "Laporan Donasi Barang": {
    columns: ["Organisasi", "Barang", "Tanggal", "Penerima", "Status"],
    rows: [
      ["Organisasi A", "Baju", "2025-04-01", "Pak Budi", "Selesai"],
      ["Organisasi C", "Mainan", "2025-03-15", "Bu Sari", "Selesai"],
    ],
  },
  "Laporan Request Donasi": {
    columns: ["Organisasi", "Barang", "Status"],
    rows: [
      ["Organisasi A", "Baju", "Pending"],
      ["Organisasi B", "Makanan", "Diterima"],
    ],
  },
  "Laporan Transaksi Penitip": {
    columns: ["Transaksi ID", "Barang", "Tanggal", "Status"],
    rows: [
      ["T001", "Baju", "2025-04-20", "Selesai"],
      ["T002", "Mainan", "2025-04-22", "Proses"],
    ],
  },
};

export default function LaporanPage() {
  const generatePDF = (laporan) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(laporan, 10, 10);

    const { columns, rows } = dummyData[laporan] || { columns: [], rows: [] };

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      styles: { fontSize: 10 },
    });

    doc.save(`${laporan}.pdf`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#5a374b", marginBottom: 20 }}>Laporan dan Unduh PDF</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {laporanList.map((laporan) => (
          <li key={laporan} style={{ marginBottom: 12 }}>
            <button
              onClick={() => generatePDF(laporan)}
              style={{
                cursor: "pointer",
                padding: "10px 16px",
                backgroundColor: "#5a374b",
                color: "white",
                border: "none",
                borderRadius: 5,
                fontWeight: "600",
              }}
              type="button"
            >
              {laporan}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
