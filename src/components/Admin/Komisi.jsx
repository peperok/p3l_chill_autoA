import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";

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
    marginBottom: "1rem",
  },
  addButton: {
    backgroundColor: "#937f6a",
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
  },
  headerTable: {
    backgroundColor: "#5a374b",
    color: "white",
  },
};

const Komisi = () => {
  const [transactions, setTransactions] = useState([]);
  const [saldoPenitip, setSaldoPenitip] = useState({});
  const [poinPembeli, setPoinPembeli] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    hunter: "",
    penitip: "",
    pembeli: "",
    barang: "",
    hargaJual: "",
    tanggalJual: "",
    durasiTitipHari: "",
    perpanjangan: false,
  });

  const diffDays = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.floor((d2 - d1) / (1000 * 3600 * 24));
  };

  const hunterRate = 0.1;
  const reuseMartRate = 0.05;
  const poinPerRupiah = 1 / 100000;

  const hitungKomisiReuseMart = (transaksi) => {
    const hariJual = diffDays(transaksi.tanggalJual, new Date());
    let komisi = transaksi.hargaJual * reuseMartRate;
    if (hariJual < 7 && !transaksi.perpanjangan) {
      komisi += transaksi.hargaJual * 0.02;
    }
    return komisi;
  };

  // Update saldo dan poin berdasarkan semua transaksi
  useEffect(() => {
    let saldoTemp = {};
    let poinTemp = {};

    transactions.forEach((trx) => {
      const komisiHunter = trx.hargaJual * hunterRate;
      const komisiReuseMart = hitungKomisiReuseMart(trx);
      const penghasilanPenitip = trx.hargaJual - komisiHunter - komisiReuseMart;

      saldoTemp[trx.penitip] = (saldoTemp[trx.penitip] || 0) + penghasilanPenitip;
      poinTemp[trx.pembeli] = (poinTemp[trx.pembeli] || 0) + Math.floor(trx.hargaJual * poinPerRupiah);
    });

    setSaldoPenitip(saldoTemp);
    setPoinPembeli(poinTemp);
  }, [transactions]);

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form tambah transaksi
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (
      !formData.id ||
      !formData.hunter ||
      !formData.penitip ||
      !formData.pembeli ||
      !formData.barang ||
      !formData.hargaJual ||
      !formData.tanggalJual ||
      !formData.durasiTitipHari
    ) {
      alert("Mohon isi semua field dengan lengkap.");
      return;
    }

    // Tambah transaksi baru
    setTransactions((prev) => [
      ...prev,
      {
        id: formData.id,
        hunter: formData.hunter,
        penitip: formData.penitip,
        pembeli: formData.pembeli,
        barang: formData.barang,
        hargaJual: Number(formData.hargaJual),
        tanggalJual: formData.tanggalJual,
        durasiTitipHari: Number(formData.durasiTitipHari),
        perpanjangan: formData.perpanjangan,
      },
    ]);

    // Reset form
    setFormData({
      id: "",
      hunter: "",
      penitip: "",
      pembeli: "",
      barang: "",
      hargaJual: "",
      tanggalJual: "",
      durasiTitipHari: "",
      perpanjangan: false,
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      <h3 style={{ marginBottom: "1rem", color: "#5a374b" }}>Input Transaksi Manual</h3>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Control
              placeholder="ID Transaksi"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="Hunter"
              name="hunter"
              value={formData.hunter}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="Penitip"
              name="penitip"
              value={formData.penitip}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="Pembeli"
              name="pembeli"
              value={formData.pembeli}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              placeholder="Barang"
              name="barang"
              value={formData.barang}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Harga Jual (Rp)"
              type="number"
              name="hargaJual"
              value={formData.hargaJual}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Tanggal Jual (YYYY-MM-DD)"
              type="date"
              name="tanggalJual"
              value={formData.tanggalJual}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              placeholder="Durasi Titip (hari)"
              type="number"
              name="durasiTitipHari"
              value={formData.durasiTitipHari}
              onChange={handleChange}
            />
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              label="Perpanjangan"
              name="perpanjangan"
              checked={formData.perpanjangan}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Button type="submit" style={{ backgroundColor: "#937f6a", border: "none" }}>
              Tambah Transaksi
            </Button>
          </Col>
        </Row>
      </Form>

      <h3 style={{ color: "#5a374b", marginBottom: "1rem" }}>Daftar Komisi dan Penghasilan</h3>

      <Table bordered hover responsive>
        <thead style={{ backgroundColor: "#5a374b", color: "white" }}>
          <tr>
            <th>ID Transaksi</th>
            <th>Hunter</th>
            <th>Penitip</th>
            <th>Pembeli</th>
            <th>Barang</th>
            <th>Harga Jual (Rp)</th>
            <th>Komisi Hunter (Rp)</th>
            <th>Komisi ReuseMart (Rp)</th>
            <th>Penghasilan Penitip (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((trx) => {
            const komisiHunter = trx.hargaJual * hunterRate;
            const komisiReuseMart = hitungKomisiReuseMart(trx);
            const penghasilanPenitip =
              trx.hargaJual - komisiHunter - komisiReuseMart;
            return (
              <tr key={trx.id}>
                <td>{trx.id}</td>
                <td>{trx.hunter}</td>
                <td>{trx.penitip}</td>
                <td>{trx.pembeli}</td>
                <td>{trx.barang}</td>
                <td>Rp {trx.hargaJual.toLocaleString()}</td>
                <td className="text-success">
                  Rp {komisiHunter.toLocaleString()}
                </td>
                <td className="text-warning">
                  Rp {komisiReuseMart.toLocaleString()}
                </td>
                <td className="text-primary fw-bold">
                  Rp {penghasilanPenitip.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Row>
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-success text-white fw-bold">
              Saldo Penitip
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm" className="text-center">
                <thead>
                  <tr>
                    <th>Penitip</th>
                    <th>Saldo (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(saldoPenitip).map(([penitip, saldo]) => (
                    <tr key={penitip}>
                      <td>{penitip}</td>
                      <td>Rp {saldo.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-info text-white fw-bold">
              Poin Pembeli
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm" className="text-center">
                <thead>
                  <tr>
                    <th>Pembeli</th>
                    <th>Poin</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(poinPembeli).map(([pembeli, poin]) => (
                    <tr key={pembeli}>
                      <td>{pembeli}</td>
                      <td>{poin}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Komisi;
