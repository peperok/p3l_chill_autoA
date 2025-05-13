import { useState } from "react";
import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";



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
  const produkList = [
  {
    nama: "Sepatu Nike",
    gambar: "https://i.pinimg.com/736x/57/93/b4/5793b4e9291df7ab6c7346d5b563cdc8.jpg",
  },
  {
    nama: "Hoodie Rajut",
    gambar: "https://i.pinimg.com/736x/00/6f/65/006f65bdd1ce37d706a78d0669b7a740.jpg",
  },
  {
    nama: "Jam Tangan",
    gambar: "https://i.pinimg.com/736x/76/80/f9/7680f946b433ba7c63bcc0f1fd9fc915.jpg"
  },
  {
    nama: "Kemeja Flanel",
    gambar: "https://i.pinimg.com/736x/1c/d0/69/1cd069dd248e50c1110bfc034b8077aa.jpg",
  },
  {
    nama: "Celana Jeans",
    gambar: "https://i.pinimg.com/736x/2c/61/88/2c6188afc6d324d60819c6de917c0d77.jpg",
  },
  {
    nama: "Tas Ransel",
    gambar: "https://i.pinimg.com/736x/01/90/17/019017ec7ab19159e9b599f767a8425f.jpg",
  },
  {
    nama: "Smartphone",
    gambar: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    nama: "Laptop",
    gambar: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    nama: "Tablet",
    gambar: "https://i.pinimg.com/736x/38/25/45/382545c1ad207592a40956808ae3c1e5.jpg",
  },
  {
    nama: "Earphone",
    gambar: "https://i.pinimg.com/736x/0a/4d/8a/0a4d8acd66c1f2b3a8ce49a03ae768fe.jpg",
  },
  {
    nama: "Topi",
    gambar: "https://i.pinimg.com/736x/ea/1b/59/ea1b5903d41352cd6c6ef806a96e433f.jpg",
  },
  {
    nama: "Kacamata",
    gambar: "https://i.pinimg.com/736x/0f/6f/7c/0f6f7c7d13792aec297b5b19f1b794b4.jpg",
  },
];


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
    placeholder="Search..."
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


  <div>
    <Link to="/login" style={{ color: 'white', marginLeft: '1rem' }}>
      Login | Register
    </Link>
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
         {produkList.map((produk, i) => (
      <div className="produk-item" key={i}>
    <img
      src={produk.gambar}
      alt={produk.nama}
      style={{
        width: "100%",
        height: "100px",
        objectFit: "cover",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px"
      }}
    />
    <div style={{ padding: "0.25rem", textAlign: "center", color: "white", fontSize: "0.85rem" }}>
      {produk.nama}
    </div>
  </div>
))}

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
          <a href="#">Metode Pengiriman</a>          <a href="#">Retur</a>
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