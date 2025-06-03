import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Container,
  InputGroup,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const navItems = [
  "Dashboard",
  "Barang",
  "Merchandise",
  "Data Pegawai",
  "Data Pembeli",
  "Data Penitip",
  "Data Organisasi",
  "Request Donasi",
  "Profile",
];

const initialForm = { nama: "", alamat: "", notelp: "" };
const initialTransaksiForm = { barang: "", jumlah: 1, tanggalMasuk: "" };

const styles = {
  // ... styles sama seperti sebelumnya
};

const API_BASE_URL = "http://localhost:8000/api"; // sesuaikan dengan URL backend-mu

const DataPenitip = () => {
  const [penitipList, setPenitipList] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Transaksi state
  const [showTransaksiModal, setShowTransaksiModal] = useState(false);
  const [selectedPenitipIndex, setSelectedPenitipIndex] = useState(null);
  const [transaksiForm, setTransaksiForm] = useState(initialTransaksiForm);
  const [transaksiEditIndex, setTransaksiEditIndex] = useState(null);
  const [searchTransaksi, setSearchTransaksi] = useState("");

  // === API: Fetch daftar penitip ===
  const fetchPenitip = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/penitips`);
      setPenitipList(response.data.data || []);
    } catch (error) {
      alert("Gagal memuat data penitip");
    }
  };

  // === API: Tambah atau update penitip ===
  const savePenitip = async () => {
    try {
      if (editIndex !== null) {
        // Update penitip (misal API PUT /penitips/{id})
        const idPenitip = penitipList[editIndex].id_penitip;
        await axios.put(`${API_BASE_URL}/penitips/${idPenitip}`, formData);
        alert("Data penitip berhasil diperbarui");
      } else {
        // Tambah penitip baru (POST /penitips)
        await axios.post(`${API_BASE_URL}/penitips`, formData);
        alert("Penitip baru berhasil ditambahkan");
      }
      setShowModal(false);
      setFormData(initialForm);
      fetchPenitip(); // refresh data
    } catch (error) {
      alert("Gagal menyimpan data penitip");
    }
  };

  // === API: Hapus penitip ===
  const deletePenitip = async (index) => {
    try {
      const idPenitip = penitipList[index].id_penitip;
      await axios.delete(`${API_BASE_URL}/penitips/${idPenitip}`);
      alert("Penitip berhasil dihapus");
      fetchPenitip();
      setSelectedPenitipIndex(null);
    } catch (error) {
      alert("Gagal menghapus penitip");
    }
  };

  // === API: Fetch transaksi penitip tertentu ===
  const fetchTransaksi = async (index) => {
    try {
      const idPenitip = penitipList[index].id_penitip;
      const response = await axios.get(`${API_BASE_URL}/penitipan?id_penitip=${idPenitip}`);
      // Simpan transaksi ke penitipList[index].transaksi
      const updated = [...penitipList];
      updated[index].transaksi = response.data.data || [];
      setPenitipList(updated);
      setSelectedPenitipIndex(index);
    } catch (error) {
      alert("Gagal memuat transaksi penitip");
    }
  };

  // === API: Simpan transaksi penitip ===
  const saveTransaksi = async () => {
    if (selectedPenitipIndex === null) return;

    try {
      const idPenitip = penitipList[selectedPenitipIndex].id_penitip;
      const payload = {
        barang: transaksiForm.barang,
        jumlah: transaksiForm.jumlah,
        tanggalMasuk: transaksiForm.tanggalMasuk,
        id_penitip: idPenitip,
      };

      if (transaksiEditIndex !== null) {
        // Update transaksi
        const transaksiId = penitipList[selectedPenitipIndex].transaksi[transaksiEditIndex].id;
        await axios.put(`${API_BASE_URL}/transaksi/${transaksiId}`, payload);
        alert("Transaksi berhasil diperbarui");
      } else {
        // Tambah transaksi baru
        await axios.post(`${API_BASE_URL}/transaksi`, payload);
        alert("Transaksi baru berhasil ditambahkan");
      }

      setShowTransaksiModal(false);
      fetchTransaksi(selectedPenitipIndex);
    } catch (error) {
      alert("Gagal menyimpan transaksi");
    }
  };

  // === API: Hapus transaksi ===
  const deleteTransaksi = async (transaksiIndex) => {
    if (selectedPenitipIndex === null) return;

    try {
      const transaksiId = penitipList[selectedPenitipIndex].transaksi[transaksiIndex].id;
      await axios.delete(`${API_BASE_URL}/transaksi/${transaksiId}`);
      alert("Transaksi berhasil dihapus");
      fetchTransaksi(selectedPenitipIndex);
    } catch (error) {
      alert("Gagal menghapus transaksi");
    }
  };

  // useEffect untuk load penitip saat mount
  useEffect(() => {
    fetchPenitip();
  }, []);

  // Event handler lain sama seperti kode awal tapi ganti fungsi save dan delete dengan API call
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData(initialForm);
    setEditIndex(null);
  };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    savePenitip();
  };
  const handleEdit = (index) => {
    setFormData(penitipList[index]);
    setEditIndex(index);
    handleShow();
  };
  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus penitip ini?")) {
      deletePenitip(index);
    }
  };

  const openTransaksiModal = (penitipIndex, editIndex = null) => {
    if (!penitipList[penitipIndex].transaksi) {
      fetchTransaksi(penitipIndex);
    }
    setSelectedPenitipIndex(penitipIndex);

    if (editIndex !== null) {
      const transaksiToEdit = penitipList[penitipIndex].transaksi[editIndex];
      setTransaksiForm({
        barang: transaksiToEdit.barang,
        jumlah: transaksiToEdit.jumlah,
        tanggalMasuk: transaksiToEdit.tanggalMasuk,
      });
      setTransaksiEditIndex(editIndex);
    } else {
      setTransaksiForm({
        barang: "",
        jumlah: 1,
        tanggalMasuk: new Date().toISOString().slice(0, 10),
      });
      setTransaksiEditIndex(null);
    }
    setShowTransaksiModal(true);
  };
  const closeTransaksiModal = () => {
    setShowTransaksiModal(false);
    setSelectedPenitipIndex(null);
    setTransaksiForm(initialTransaksiForm);
    setTransaksiEditIndex(null);
  };
  const handleTransaksiChange = (e) => {
    setTransaksiForm({ ...transaksiForm, [e.target.name]: e.target.value });
  };
  const handleTransaksiSubmit = (e) => {
    e.preventDefault();
    saveTransaksi();
  };
  const handleDeleteTransaksi = (index) => {
    if (window.confirm("Yakin ingin menghapus transaksi ini?")) {
      deleteTransaksi(index);
    }
  };

  // Filter penitip dan transaksi seperti sebelumnya
  const filteredList = penitipList.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );
  const transaksiFiltered = selectedPenitipIndex !== null
    ? (penitipList[selectedPenitipIndex].transaksi || []).filter((t) =>
        t.barang.toLowerCase().includes(searchTransaksi.toLowerCase())
      )
    : [];

  // Fungsi hitung durasi tetap sama
  const hitungDurasi = (tanggalMasuk) => {
    const masuk = new Date(tanggalMasuk);
    const sekarang = new Date();
    const diffTime = sekarang - masuk;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="d-flex vh-100" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h4 className="text-center mb-4">ReuseMart</h4>
        {navItems.map((item) => (
          <NavLink
            key={item}
            to={`/admin/${item.replace(/ /g, "").toLowerCase()}`}
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
            }
          >
            {item}
          </NavLink>
        ))}
        <NavLink
          to="/login"
          className="mt-auto btn btn-warning text-dark text-center"
          style={{ backgroundColor: "#937f6a", border: "none" }}
        >
          Logout
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light overflow-auto">
        <Container fluid>
          <Row className="align-items-center mb-3">
            <Col>
              <h4 style={styles.title}>Data Penitip</h4>
            </Col>
            <Col className="text-end">
              <Button style={styles.addButton} onClick={handleShow}>
                + Tambah Penitip
              </Button>
            </Col>
          </Row>

          <Form.Control
            type="text"
            placeholder="Cari berdasarkan nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
            style={styles.searchBox}
          />

          {/* Tabel Penitip */}
          <div className="table-responsive">
            <Table bordered hover className="bg-white table-striped">
              <thead>
                <tr style={styles.headerTable}>
                  <th>#</th>
                  <th>Nama Penitip</th>
                  <th>Alamat</th>
                  <th>No Telepon</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((penitip, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{penitip.nama}</td>
                    <td>{penitip.alamat}</td>
                    <td>{penitip.notelp}</td>
                    <td>
                      <Button
                        size="sm"
                        style={{ ...styles.editButton, marginRight: "8px" }}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        style={{ ...styles.transaksiButton, marginRight: "8px" }}
                        onClick={() => fetchTransaksi(index)}
                      >
                        Lihat Transaksi
                      </Button>
                      <Button
                        size="sm"
                        style={styles.deleteButton}
                        onClick={() => handleDelete(index)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Daftar Transaksi Penitip */}
          {selectedPenitipIndex !== null && (
            <div className="mt-4 bg-white p-3 rounded shadow-sm">
              <h5>Transaksi Barang Titipan - {penitipList[selectedPenitipIndex].nama}</h5>

              <Row className="mb-2">
                <Col md={6}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Cari berdasarkan nama barang..."
                      value={searchTransaksi}
                      onChange={(e) => setSearchTransaksi(e.target.value)}
                    />
                    <Button variant="outline-secondary" onClick={() => setSearchTransaksi("")}>
                      Reset
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={6} className="text-end">
                  <Button
                    style={styles.addButton}
                    onClick={() => openTransaksiModal(selectedPenitipIndex)}
                  >
                    + Tambah Transaksi
                  </Button>
                </Col>
              </Row>

              <Table bordered hover size="sm" responsive>
                <thead>
                  <tr style={styles.headerTable}>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Jumlah</th>
                    <th>Tanggal Masuk</th>
                    <th>Durasi (hari)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {transaksiFiltered.length > 0 ? (
                    transaksiFiltered.map((t, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{t.barang}</td>
                        <td>{t.jumlah}</td>
                        <td>{t.tanggalMasuk}</td>
                        <td>{hitungDurasi(t.tanggalMasuk)}</td>
                        <td>
                          <Button
                            size="sm"
                            style={{ ...styles.editButton, marginRight: "8px" }}
                            onClick={() => openTransaksiModal(selectedPenitipIndex, i)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            style={styles.deleteButton}
                            onClick={() => handleDeleteTransaksi(i)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Tidak ada transaksi ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}

          {/* Modal Penitip */}
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton style={styles.modalHeader}>
              <Modal.Title>{editIndex !== null ? "Edit" : "Tambah"} Penitip</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>No Telepon</Form.Label>
                  <Form.Control
                    name="notelp"
                    value={formData.notelp}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <div className="text-end">
                  <Button type="submit" style={styles.addButton}>
                    Simpan
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Modal Transaksi */}
          <Modal show={showTransaksiModal} onHide={closeTransaksiModal} centered>
            <Modal.Header closeButton style={styles.modalHeader}>
              <Modal.Title>{transaksiEditIndex !== null ? "Edit" : "Tambah"} Transaksi Barang Titipan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleTransaksiSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Barang</Form.Label>
                  <Form.Control
                    name="barang"
                    value={transaksiForm.barang}
                    onChange={handleTransaksiChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Jumlah</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    name="jumlah"
                    value={transaksiForm.jumlah}
                    onChange={handleTransaksiChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Masuk</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggalMasuk"
                    value={transaksiForm.tanggalMasuk}
                    onChange={handleTransaksiChange}
                    required
                  />
                </Form.Group>
                <div className="text-end">
                  <Button type="submit" style={styles.addButton}>
                    Simpan Transaksi
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default DataPenitip;
