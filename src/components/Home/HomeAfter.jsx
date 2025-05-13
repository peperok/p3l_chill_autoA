import { useState } from "react";
import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

function HomeAfter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Hasil pencarian untuk: ${searchTerm}`);
      setShowAlert(true);
    }, 1000);
  };

  const handleLogout = () => {
    toast.info("Anda telah logout");
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: sans-serif;
            background-color: #f5f5f5;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #937f6a;
            color: white;
            padding: 1rem 2rem;
          }

          .logo {
            font-size: 1.5rem;
            font-weight: bold;
          }

          .search-bar {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-grow: 1;
            max-width: 600px;
          }

          .search-input {
            flex-grow: 1;
            min-width: 200px;
          }

          .search-button {
            white-space: nowrap;
          }

          .promo {
            background-color: #b4a95c;
            text-align: center;
            padding: 1rem;
            color: #3a4550;
            font-weight: bold;
          }

          .slider {
            height: 200px;
            background-color: #5a374b;
            margin: 1rem;
            border-radius: 8px;
          }

          .kategori {
            background-color: #3a4550;
            padding: 1rem;
            color: white;
            text-align: center;
            font-weight: bold;
          }

          .kategori-icons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
          }

          .kategori-icons div {
            width: 40px;
            height: 40px;
            background-color: #b4a95c;
            border-radius: 8px;
          }

          .produk-section {
            padding: 2rem;
          }

          .produk-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
          }

          .produk-item {
            background-color: #937f6a;
            height: 150px;
            border-radius: 8px;
          }

          footer {
            background-color: #3a4550;
            color: white;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            padding: 2rem;
            gap: 2rem;
          }

          footer h4 {
            margin-bottom: 0.5rem;
            color: #b4a95c;
          }

          footer a, footer p {
            color: white;
            display: block;
            margin-bottom: 0.25rem;
            text-decoration: none;
          }

          .social-media div {
            width: 24px;
            height: 24px;
            background-color: #b4a95c;
            border-radius: 50%;
            display: inline-block;
            margin-right: 0.5rem;
          }
        `}
      </style>

      <header className="header">
        <div className="logo">ReuseMart</div>

        <div className="search-bar">
          <Form.Control
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button onClick={handleSearch} disabled={loading} className="search-button">
            {loading ? <Spinner animation="border" size="sm" /> : "Cari"}
          </Button>
          <Link to="/cart" style={{ color: 'white', fontSize: '1.5rem' }}>
            <FaShoppingCart />
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "1rem" }}>Halo, <strong>Wira</strong></span>
          <Button onClick={handleLogout} size="sm" variant="light">
            Logout
          </Button>
        </div>
      </header>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Menampilkan hasil untuk "{searchTerm}"
        </Alert>
      )}

      <div className="promo">Selamat Datang Kembali! Nikmati Promo Eksklusif Member!</div>
      <div className="slider"></div>

      <div className="kategori">
        Kategori
        <div className="kategori-icons">
          {Array(10).fill().map((_, i) => <div key={i}></div>)}
        </div>
      </div>

      <div className="produk-section">
        <h3>Rekomendasi Untuk Kamu</h3>
        <div className="produk-grid">
          {Array(12).fill().map((_, i) => <div className="produk-item" key={i}></div>)}
        </div>
      </div>

      <footer>
        <div>
          <h4>Layanan Pengaduan Konsumen</h4>
          <p>Email: support@belanjamart.id</p>
          <p>WhatsApp: +62 812 3456 7890</p>
        </div>
        <div>
          <h4>Akun Saya</h4>
          <a href="#">Transaksi Saya</a>
          <a href="#">Wishlist</a>
          <a href="#">Profil</a>
        </div>
        <div>
          <h4>Bantuan</h4>
          <a href="#">FAQ</a>
          <a href="#">Kebijakan Privasi</a>
          <a href="#">Kebijakan Retur</a>
        </div>
        <div>
          <h4>Social Media</h4>
          <div className="social-media">
            <div></div><div></div><div></div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomeAfter;
