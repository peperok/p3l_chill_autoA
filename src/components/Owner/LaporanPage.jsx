import React from "react";
import { generateLaporanStokGudang } from "../Owner/LaporanStokGudang";

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

export default function LaporanPage() {
  const handleGenerate = async (laporan) => {
    switch (laporan) {
      case "Laporan Stok Gudang":
        await generateLaporanStokGudang();
        break;
      default:
        alert("Laporan belum tersedia");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#5a374b", marginBottom: 20 }}>
        Laporan dan Unduh PDF
      </h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {laporanList.map((laporan) => (
          <li key={laporan} style={{ marginBottom: 12 }}>
            <button
              onClick={() => handleGenerate(laporan)}
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
