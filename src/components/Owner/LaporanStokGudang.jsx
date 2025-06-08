// src/components/laporan/LaporanStokGudang.jsx
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { laporanStokGudang } from "../../api/apiBarang";

export async function generateLaporanStokGudang() {
  try {
    const data = await laporanStokGudang();
    console.log(data);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Laporan Stok Gudang", 10, 10);

    const columns = [
      "ID Barang",
      "Nama Barang",
      "ID Penitip",
      "Tgl Masuk",
      "Konfirmasi Perpanjangan",
      "ID Hunter",
      "Nama Petugas",
      "Harga",
    ];

    const rows = data.map((item) => [
      item.id_barang,
      item.nama_barang,
      item.id_penitip,
      item.tgl_penitipan,
      item.konfirmasi_perpanjangan,
      item.id_pegawai,
      item.nama_petugas || "-",
      item.harga_barang,
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
      styles: { fontSize: 10 },
    });

    doc.save("Laporan Stok Gudang.pdf");
  } catch (error) {
    console.error("Gagal generate laporan stok gudang:", error);
    console.log("Token:", sessionStorage.getItem("token"));

    alert("Gagal mengambil data dari server");
  }
}
