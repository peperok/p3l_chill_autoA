import { useState } from "react";
import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function HomeBefore() {
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
            gap: 0.5rem;
            align-items: center;
          }

          .promo {
            background-color: #f3e5ab;
            text-align: center;
            padding: 1rem;
            color: #5a374b;
            font-weight: bold;
          }

          .slider {
            height: 200px;
            background-color: #ccc;
            margin: 1rem;
            border-radius: 8px;
          }

          .kategori {
            background-color: #ff7300;
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
            background-color: white;
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
            background-color: #e0e0e0;
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
            background-color: white;
            border-radius: 50%;
            display: inline-block;
            margin-right: 0.5rem;
          }
        `}
      </style>

      <header className="header">
        <div className="logo">BelanjaMart</div>
        <div className="search-bar">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Cari"}
          </Button>
        </div>
        <div>
          <span role="img" aria-label="cart">🛒</span>
          <Link to="/login" style={{ color: 'white', marginLeft: '1rem' }}>Login | Register</Link>
        </div>
      </header>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Menampilkan hasil untuk "{searchTerm}"
        </Alert>
      )}

      <div className="promo">Lebih Hemat Pakai Promo!</div>
      <div className="slider"></div>

      <div className="kategori">
        Kategori
        <div className="kategori-icons">
          {Array(10).fill().map((_, i) => <div key={i}></div>)}
        </div>
      </div>

      <div className="produk-section">
        <h3>Rekomendasi Produk</h3>
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
          <h4>Layanan Konsumen</h4>
          <a href="#">Metode Pembayaran</a>
          <a href="#">Metode Pengiriman</a>
          <a href="#">Retur</a>
          <a href="#">Konfirmasi Transfer</a>
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

export default HomeBefore;
