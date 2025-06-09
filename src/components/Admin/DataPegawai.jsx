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

const initialForm = { nama: "", username: "", jabatan: "" };

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
    transition: "background 0.3s",
    fontWeight: 500,
    fontSize: "0.95rem",
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
  saveButton: {
    backgroundColor: "#937f6a",
    border: "none",
    color: "white",
  },
  headerTable: {
    backgroundColor: "#5a374b",
    color: "white",
  },
  searchBox: {
    maxWidth: "400px",
  },
  modalHeader: {
    backgroundColor: "#3a4550",
    color: "white",
  },
};

const DataPegawai = () => {
  const [pegawaiList, setPegawaiList] = useState([]);
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
      const updated = [...pegawaiList];
      updated[editIndex] = formData;
      setPegawaiList(updated);
    } else {
      setPegawaiList([...pegawaiList, formData]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setFormData(pegawaiList[index]);
    setEditIndex(index);
    handleShow();
  };

  const handleDelete = (index) => {
    const updated = pegawaiList.filter((_, i) => i !== index);
    setPegawaiList(updated);
  };

  const filteredList = pegawaiList.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="d-flex vh-100"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
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
              <h4 style={styles.title}>Data Pegawai Admin</h4>
            </Col>
            <Col className="text-end">
              <Button style={styles.addButton} onClick={handleShow}>
                Transaksi
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

          <div className="table-responsive">
            <Table bordered hover className="bg-white table-striped">
              <thead>
                <tr style={styles.headerTable}>
                  <th>#</th>
                  <th>Nama Barang</th>
                  <th>Harga Barang</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((pegawai, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{pegawai.nama}</td>
                    <td>{pegawai.username}</td>
                    <td>{pegawai.jabatan}</td>
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

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>
              {editIndex !== null ? "Edit" : "Tambah"} Pegawai
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Harga Barang</Form.Label>
                <Form.Control
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status Barang</Form.Label>
                <Form.Control
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="text-end">
                <Button type="submit" style={styles.saveButton}>
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

export default DataPegawai;
