import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Container,
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

const initialForm = {
  namaDonatur: "",
  jenisDonasi: "",
  jumlah: "",
  deskripsi: "",
  tanggalDonasi: "",
  alamatPenjemputan: "",
  kontak: "",
};

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

const RequestDonasi = () => {
  const [requestList, setRequestList] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      const updated = [...requestList];
      updated[editIndex] = formData;
      setRequestList(updated);
    } else {
      setRequestList([...requestList, formData]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setFormData(requestList[index]);
    setEditIndex(index);
    handleShow();
  };

  const handleDelete = (index) => {
    const updated = requestList.filter((_, i) => i !== index);
    setRequestList(updated);
  };

  const filteredList = requestList.filter((item) =>
    item.namaDonatur.toLowerCase().includes(search.toLowerCase())
  );

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
              <h4 style={styles.title}>Request Donasi</h4>
            </Col>
            <Col className="text-end">
              <Button style={styles.addButton} onClick={handleShow}>
                + Tambah Request Donasi
              </Button>
            </Col>
          </Row>

          <Form.Control
            type="text"
            placeholder="Cari berdasarkan nama donatur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
            style={styles.searchBox}
          />

          <div className="table-responsive">
            <Table bordered hover className="bg-white table-striped">
              <thead style={styles.headerTable}>
                <tr>
                  <th>#</th>
                  <th>Nama Donatur</th>
                  <th>Jenis Donasi</th>
                  <th>Jumlah</th>
                  <th>Deskripsi</th>
                  <th>Tanggal Donasi</th>
                  <th>Alamat Penjemputan</th>
                  <th>Kontak</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((req, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{req.namaDonatur}</td>
                    <td>{req.jenisDonasi}</td>
                    <td>{req.jumlah}</td>
                    <td>{req.deskripsi}</td>
                    <td>{req.tanggalDonasi}</td>
                    <td>{req.alamatPenjemputan}</td>
                    <td>{req.kontak}</td>
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
        </Container>

        <Modal show={showModal} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>{editIndex !== null ? "Edit" : "Tambah"} Request Donasi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="namaDonatur">
                    <Form.Label>Nama Donatur</Form.Label>
                    <Form.Control
                      name="namaDonatur"
                      value={formData.namaDonatur}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="jenisDonasi">
                    <Form.Label>Jenis Donasi</Form.Label>
                    <Form.Control
                      as="select"
                      name="jenisDonasi"
                      value={formData.jenisDonasi}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Pilih jenis donasi</option>
                      <option value="Uang">Uang</option>
                      <option value="Pakaian">Pakaian</option>
                      <option value="Makanan">Makanan</option>
                      <option value="Buku">Buku</option>
                      <option value="Elektronik">Elektronik</option>
                      <option value="Lainnya">Lainnya</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="jumlah">
                    <Form.Label>Jumlah / Volume</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      name="jumlah"
                      value={formData.jumlah}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="tanggalDonasi">
                    <Form.Label>Tanggal Donasi</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggalDonasi"
                      value={formData.tanggalDonasi}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="deskripsi">
                <Form.Label>Deskripsi Donasi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="alamatPenjemputan">
                <Form.Label>Alamat Penjemputan</Form.Label>
                <Form.Control
                  name="alamatPenjemputan"
                  value={formData.alamatPenjemputan}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="kontak">
                <Form.Label>Kontak Donatur</Form.Label>
                <Form.Control
                  type="tel"
                  name="kontak"
                  value={formData.kontak}
                  onChange={handleChange}
                  required
                  placeholder="Nomor telepon / email"
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
      </div>
    </div>
  );
};

export default RequestDonasi;
