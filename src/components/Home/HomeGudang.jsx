import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Table, Alert } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import { GetAllTransactions, CreateTransaction, ConfirmReceived } from "../../api/apiGudang";


function HomeGudang() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("pengiriman");
  const [formData, setFormData] = useState({ customer: "", kurir: "", jadwal: "" });
  const [alert, setAlert] = useState(null);
  const printComponentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  // Fetch transaksi dari backend saat komponen mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await GetAllTransactions();
      setTransactions(data);
    } catch (error) {
      setAlert(`Gagal load data: ${error.message || error}`);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setFormData({ customer: "", kurir: "", jadwal: "" });
    setAlert(null);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!formData.customer || !formData.jadwal || (modalType === "pengiriman" && !formData.kurir)) {
      setAlert("Mohon isi semua data dengan lengkap.");
      return;
    }

    const newData = {
      customer: formData.customer,
      kurir: modalType === "pengiriman" ? formData.kurir : null,
      jadwal: formData.jadwal,
      type: modalType === "pengiriman" ? "Pengiriman" : "Pengambilan Sendiri",
    };

    try {
      await CreateTransaction(newData);
      setShowModal(false);
      setAlert(null);
      fetchTransactions(); // reload data
    } catch (error) {
      setAlert(`Gagal simpan: ${error.message || error}`);
    }
  };

  const confirmReceived = async (id) => {
    try {
      await ConfirmReceived(id);
      setAlert("Konfirmasi berhasil.");
      fetchTransactions();
    } catch (error) {
      setAlert(`Gagal konfirmasi: ${error.message || error}`);
    }
  };

  return (
    <div className="container my-4">
      <h2>Dashboard Gudang</h2>

      {alert && (
        <Alert variant="info" onClose={() => setAlert(null)} dismissible>
          {alert}
        </Alert>
      )}

      <div className="mb-3">
        <Button variant="primary" className="me-2" onClick={() => openModal("pengiriman")}>
          Tambah Jadwal Pengiriman & Kurir
        </Button>
        <Button variant="secondary" onClick={() => openModal("pengambilan")}>
          Tambah Jadwal Pengambilan Sendiri
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Jenis</th>
            <th>Kurir</th>
            <th>Jadwal</th>
            <th>Status</th>
            <th>Nota</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.customer}</td>
              <td>{tx.type}</td>
              <td>{tx.kurir || "-"}</td>
              <td>{tx.jadwal}</td>
              <td>{tx.status}</td>
              <td>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => {
                    alert(`Cetak PDF Nota: ${tx.nota || "Tidak tersedia"} (simulasi)`);
                  }}
                >
                  Cetak Nota
                </Button>
              </td>
              <td>
                {tx.status !== "Sudah Diterima" && (
                  <Button variant="success" size="sm" onClick={() => confirmReceived(tx.id)}>
                    Konfirmasi Diterima
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "pengiriman"
              ? "Tambah Jadwal Pengiriman & Kurir"
              : "Tambah Jadwal Pengambilan Sendiri"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCustomer">
              <Form.Label>Nama Customer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama customer"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
              />
            </Form.Group>

            {modalType === "pengiriman" && (
              <Form.Group className="mb-3" controlId="formKurir">
                <Form.Label>Nama Kurir</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama kurir"
                  name="kurir"
                  value={formData.kurir}
                  onChange={handleChange}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formJadwal">
              <Form.Label>Jadwal (Tanggal dan Waktu)</Form.Label>
              <Form.Control
                type="datetime-local"
                name="jadwal"
                value={formData.jadwal}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          {alert && <Alert variant="danger">{alert}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ display: "none" }}>
        <div ref={printComponentRef}>
          <h3>Nota Penjualan</h3>
          {/* Bisa dikembangkan isi nota sesuai kebutuhan */}
        </div>
      </div>
    </div>
  );
}

export default HomeGudang;
