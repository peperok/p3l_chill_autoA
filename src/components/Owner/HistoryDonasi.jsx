import React, { useState } from "react";
import {
  Table,
  Form,
  Container,
} from "react-bootstrap";

const styles = {
  title: {
    color: "#5a374b",
    fontWeight: 600,
    marginBottom: "1rem",
  },
  searchBox: {
    maxWidth: 400,
    marginBottom: "1rem",
  },
  headerTable: {
    backgroundColor: "#5a374b",
    color: "white",
  },
};

// Contoh data donasi
const dummyDonasi = [
  {
    id: "D001",
    organisasi: "Organisasi A",
    jenisDonasi: "Pakaian",
    jumlah: 50,
    tanggal: "2025-01-15",
    status: "Terkirim",
  },
  {
    id: "D002",
    organisasi: "Organisasi B",
    jenisDonasi: "Makanan",
    jumlah: 30,
    tanggal: "2025-02-20",
    status: "Pending",
  },
  {
    id: "D003",
    organisasi: "Organisasi A",
    jenisDonasi: "Uang",
    jumlah: 1000000,
    tanggal: "2025-03-10",
    status: "Terkirim",
  },
  // Tambah data sesuai kebutuhan
];

const HistoryDonasi = () => {
  const [searchOrg, setSearchOrg] = useState("");

  // Filter data berdasarkan input organisasi
  const filteredDonasi = dummyDonasi.filter(donasi =>
    donasi.organisasi.toLowerCase().includes(searchOrg.toLowerCase())
  );

  return (
    <Container fluid style={{ fontFamily: "Poppins, sans-serif" }}>
      <h4 style={styles.title}>History Donasi Organisasi</h4>

      <Form.Control
        type="text"
        placeholder="Cari berdasarkan nama organisasi..."
        value={searchOrg}
        onChange={(e) => setSearchOrg(e.target.value)}
        style={styles.searchBox}
      />

      <div className="table-responsive">
        <Table bordered hover className="bg-white table-striped">
          <thead style={styles.headerTable}>
            <tr>
              <th>ID Donasi</th>
              <th>Organisasi</th>
              <th>Jenis Donasi</th>
              <th>Jumlah</th>
              <th>Tanggal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonasi.length > 0 ? (
              filteredDonasi.map((donasi) => (
                <tr key={donasi.id}>
                  <td>{donasi.id}</td>
                  <td>{donasi.organisasi}</td>
                  <td>{donasi.jenisDonasi}</td>
                  <td>{donasi.jumlah}</td>
                  <td>{donasi.tanggal}</td>
                  <td>{donasi.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", color: "#937f6a" }}>
                  Tidak ada data donasi yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default HistoryDonasi;
