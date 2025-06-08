// src/components/laporan/LaporanStokGudang.jsx
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { laporanPerKategori, laporanStokGudang } from "../../api/apiBarang";

export async function generateLaporanPerKategori() {
  try {
    const data = await laporanPerKategori();
    console.log(data);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Laporan Penjualan Per Kategori", 10, 10);

    const columns = [
      "Kategori",
      "Jumlah Item Terjual",
      "Jumlah Item Gagal Terjual",
    ];

    const rows = data.map((item) => [
      item.jenis_kategori,
      (item.status_barang = "terjual"),
      (item.status_barang = "didonasikan" || "dikembalikan"),
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
