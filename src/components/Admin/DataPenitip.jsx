import React, { useState } from "react";
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
  sidebar: {
    backgroundColor: "#5a374b",
    color: "white",
    width: "250px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  navLink: {
    padding: "10px 15px",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    marginBottom: "5px",
    fontWeight: 500,
    fontSize: "0.95rem",
    transition: "background 0.3s",
  },
  activeLink: {
    backgroundColor: "#ffffff",
    color: "#5a374b",
  },
  title: {
    color: "#5a374b",
    fontWeight: 600,
  },
  addButton: {
    backgroundColor: "#937f6a",
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
  },
  editButton: {
    backgroundColor: "#b4a95c",
    border: "none",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#5a374b",
    border: "none",
    color: "white",
  },
  transaksiButton: {
    backgroundColor: "#3a4550",
    border: "none",
    color: "white",
  },
  headerTable: {
    backgroundColor: "#5a374b",
    color: "white",
  },
  searchBox: {
    maxWidth: 400,
  },
  modalHeader: {
    backgroundColor: "#3a4550",
    color: "white",
  },
};

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

  // Fungsi modal penitip
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData(initialForm);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...penitipList];
      updated[editIndex] = formData;
      setPenitipList(updated);
    } else {
      setPenitipList([...penitipList, { ...formData, transaksi: [] }]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setFormData(penitipList[index]);
    setEditIndex(index);
    handleShow();
  };

  const handleDelete = (index) => {
    const updated = penitipList.filter((_, i) => i !== index);
    setPenitipList(updated);
  };

  const filteredList = penitipList.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  // Fungsi modal transaksi
  const openTransaksiModal = (index, editIndex = null) => {
    setSelectedPenitipIndex(index);
    if (editIndex !== null) {
      const transaksiToEdit = penitipList[index].transaksi[editIndex];
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
        tanggalMasuk: new Date().toISOString().slice(0, 10), // default hari ini
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

  // Fungsi hitung durasi titipan (dalam hari) dari tanggalMasuk sampai hari ini
  const hitungDurasi = (tanggalMasuk) => {
    const masuk = new Date(tanggalMasuk);
    const sekarang = new Date();
    const diffTime = sekarang - masuk;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // hari
  };

  const handleTransaksiSubmit = (e) => {
    e.preventDefault();
    if (selectedPenitipIndex === null) return;

    const updatedPenitips = [...penitipList];
    const currentPenitip = updatedPenitips[selectedPenitipIndex];

    if (!currentPenitip.transaksi) {
      currentPenitip.transaksi = [];
    }

    if (transaksiEditIndex !== null) {
      // update transaksi existing
      currentPenitip.transaksi[transaksiEditIndex] = {
        barang: transaksiForm.barang,
        jumlah: transaksiForm.jumlah,
        tanggalMasuk: transaksiForm.tanggalMasuk,
      };
    } else {
      // tambah transaksi baru
      currentPenitip.transaksi.push({
        barang: transaksiForm.barang,
        jumlah: transaksiForm.jumlah,
        tanggalMasuk: transaksiForm.tanggalMasuk,
      });
    }

    setPenitipList(updatedPenitips);
    closeTransaksiModal();
  };

  // Filter transaksi per penitip berdasarkan searchTransaksi
  const transaksiFiltered = selectedPenitipIndex !== null
    ? (penitipList[selectedPenitipIndex].transaksi || []).filter((t) =>
        t.barang.toLowerCase().includes(searchTransaksi.toLowerCase())
      )
    : [];

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
              isActive
                ? { ...styles.navLink, ...styles.activeLink }
                : styles.navLink
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
                        onClick={() => {
                          setSelectedPenitipIndex(index);
                        }}
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
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSearchTransaksi("")}
                    >
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
                            onClick={() => {
                              const updated = [...penitipList];
                              updated[selectedPenitipIndex].transaksi.splice(i, 1);
                              setPenitipList(updated);
                            }}
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

          {/* Modal Penitip (Tambah/Edit) */}
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
