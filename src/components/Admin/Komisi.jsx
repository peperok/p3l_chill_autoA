import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Card,
  Nav,
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

const MOCK_TRANSACTIONS = [
  {
    id: "TRX001",
    hunter: "Hunter A",
    penitip: "Penitip X",
    pembeli: "Pembeli 1",
    barang: "Tas Kulit",
    hargaJual: 1000000,
    tanggalJual: "2024-05-01",
    durasiTitipHari: 10,
    perpanjangan: false,
  },
  {
    id: "TRX002",
    hunter: "Hunter B",
    penitip: "Penitip Y",
    pembeli: "Pembeli 2",
    barang: "Sepatu",
    hargaJual: 750000,
    tanggalJual: "2024-05-10",
    durasiTitipHari: 5,
    perpanjangan: true,
  },
];

const Komisi = () => {
  const [saldoPenitip, setSaldoPenitip] = useState({});
  const [poinPembeli, setPoinPembeli] = useState({});

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

  const tambahSaldoPenitip = (nama, jumlah) => {
    setSaldoPenitip((prev) => ({
      ...prev,
      [nama]: (prev[nama] || 0) + jumlah,
    }));
  };

  const tambahPoinPembeli = (nama, jumlahPoin) => {
    setPoinPembeli((prev) => ({
      ...prev,
      [nama]: (prev[nama] || 0) + jumlahPoin,
    }));
  };

  useEffect(() => {
    MOCK_TRANSACTIONS.forEach((trx) => {
      const komisiHunter = trx.hargaJual * hunterRate;
      const komisiReuseMart = hitungKomisiReuseMart(trx);
      const penghasilanPenitip = trx.hargaJual - komisiHunter - komisiReuseMart;

      tambahSaldoPenitip(trx.penitip, penghasilanPenitip);
      tambahPoinPembeli(trx.pembeli, Math.floor(trx.hargaJual * poinPerRupiah));
    });
  }, []);

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
      <div
        className="flex-grow-1 p-4 bg-light overflow-auto"
        style={{ minHeight: "100vh" }}
      >
        <Container fluid>
          <h4 style={styles.title}>Daftar Komisi dan Penghasilan</h4>

          <Table bordered hover responsive className="bg-white table-striped">
            <thead style={styles.headerTable}>
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
              {MOCK_TRANSACTIONS.map((trx) => {
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
        </Container>
      </div>
    </div>
  );
};

export default Komisi;
