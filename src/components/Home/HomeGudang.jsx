import React, { useState, useRef } from "react";
import { Button, Modal, Form, Table, Alert } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

const sampleTransactions = [
  {
    id: 1,
    customer: "Budi Santoso",
    type: "Pengiriman",
    kurir: "Joko",
    jadwal: "2025-06-05 10:00",
    status: "Menunggu Pengiriman",
    nota: "Nota-001.pdf"
  },
  {
    id: 2,
    customer: "Sari Dewi",
    type: "Pengambilan Sendiri",
    kurir: null,
    jadwal: "2025-06-06 14:00",
    status: "Menunggu Pengambilan",
    nota: "Nota-002.pdf"
  },
];

function HomeGudang() {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("pengiriman"); // pengiriman / pengambilan
  const [formData, setFormData] = useState({
    customer: "",
    kurir: "",
    jadwal: "",
  });
  const [alert, setAlert] = useState(null);
  const printComponentRef = useRef();

  // Handler untuk print nota (simulasi)
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  // Buka modal tambah jadwal pengiriman atau pengambilan
  const openModal = (type) => {
    setModalType(type);
    setFormData({ customer: "", kurir: "", jadwal: "" });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Simulasi simpan jadwal baru
  const handleSave = () => {
    if (!formData.customer || !formData.jadwal || (modalType === "pengiriman" && !formData.kurir)) {
      setAlert("Mohon isi semua data dengan lengkap.");
      return;
    }
    const newTransaction = {
      id: transactions.length + 1,
      customer: formData.customer,
      type: modalType === "pengiriman" ? "Pengiriman" : "Pengambilan Sendiri",
      kurir: modalType === "pengiriman" ? formData.kurir : null,
      jadwal: formData.jadwal,
      status: modalType === "pengiriman" ? "Menunggu Pengiriman" : "Menunggu Pengambilan",
      nota: `Nota-00${transactions.length + 1}.pdf`
    };
    setTransactions(prev => [...prev, newTransaction]);
    setShowModal(false);
    setAlert(null);
  };

  // Konfirmasi barang diterima
  const confirmReceived = (id) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        return { ...tx, status: "Sudah Diterima" };
      }
      return tx;
    }));
    setAlert("Konfirmasi berhasil.");
  };

  return (
    <div className="container my-4">
      <h2>Dashboard Gudang</h2>

      {alert && <Alert variant="info" onClose={() => setAlert(null)} dismissible>{alert}</Alert>}

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
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.customer}</td>
              <td>{tx.type}</td>
              <td>{tx.kurir || "-"}</td>
              <td>{tx.jadwal}</td>
              <td>{tx.status}</td>
              <td>
                <Button variant="outline-success" size="sm" onClick={() => {
                  alert(`Cetak PDF Nota: ${tx.nota} (simulasi)`);
                  // Jika mau cetak sebenarnya bisa integrasi react-to-print dll
                }}>
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

      {/* Modal Tambah Jadwal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "pengiriman" ? "Tambah Jadwal Pengiriman & Kurir" : "Tambah Jadwal Pengambilan Sendiri"}
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
          <Button variant="primary" onClick={handleSave}>Simpan</Button>
        </Modal.Footer>
      </Modal>

      {/* Komponen untuk cetak (simulasi) bisa ditambahkan jika ingin menggunakan react-to-print */}
      <div style={{ display: "none" }}>
        <div ref={printComponentRef}>
          {/* Contoh isi nota, bisa dikembangkan */}
          <h3>Nota Penjualan</h3>
          {/* Isi nota transaksi */}
        </div>
      </div>
    </div>
  );
}

export default HomeGudang;
