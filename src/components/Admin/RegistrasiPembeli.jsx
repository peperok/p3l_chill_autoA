// src/components/Home/DataPenitip.jsx
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

const RegisterPembeli = () => {
  const [penitipList, setPenitipList] = useState([]);
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
      const updated = [...penitipList];
      updated[editIndex] = formData;
      setPenitipList(updated);
    } else {
      setPenitipList([...penitipList, formData]);
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

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="bg-dark text-white d-flex flex-column p-3"
        style={{ width: "250px" }}
      >
        <h4 className="text-center mb-4">ReuseMart</h4>
        {navItems.map((item) => (
          <NavLink
            key={item}
            to={`/admin/${item.replace(/ /g, "").toLowerCase()}`}
            className={({ isActive }) =>
              `py-2 px-3 text-white text-decoration-none rounded mb-1 ${
                isActive ? "bg-secondary" : "hover:bg-light text-white"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
        <NavLink
          to="/login"
          className="mt-auto btn btn-warning text-dark text-center"
        >
          Logout
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light overflow-auto">
        <Container fluid>
          <Row className="align-items-center mb-3">
            <Col>
              <h4 style={{ color: "#5a374b" }}>Data pembeli</h4>
            </Col>
            <Col className="text-end">
              <Button
                onClick={handleShow}
                style={{ backgroundColor: "#937f6a", border: "none" }}
              >
                Tambah pembeli
              </Button>
            </Col>
          </Row>

          <Form.Control
            type="text"
            placeholder="Cari berdasarkan nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
            style={{ maxWidth: 400 }}
          />

          <div className="table-responsive">
            <Table bordered hover className="bg-white">
              <thead style={{ backgroundColor: "#3a4550", color: "white" }}>
                <tr>
                  <th>#</th>
                  <th>Nama Pembeli</th>
                  <th>Alamat</th>
                  <th>No Telepon</th>
                  <th>Keterangan</th>
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
                        style={{ backgroundColor: "#b4a95c", border: "none" }}
                        className="me-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        style={{ backgroundColor: "#5a374b", border: "none" }}
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
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#3a4550", color: "white" }}
          >
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
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pembeli</Form.Label>
                <Form.Control
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="text-end">
                <Button
                  type="submit"
                  style={{ backgroundColor: "#937f6a", border: "none" }}
                >
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

export default RegisterPembeli;
