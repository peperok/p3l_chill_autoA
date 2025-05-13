import { useState, useEffect } from "react";
import { Button, Alert, Spinner, Form, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FaShoppingCart, 
  FaSearch, 
  FaUser, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram,
  FaHeart
} from "react-icons/fa";

const user = {
  name: "Wira Utama",
  email: "wira@example.com"
};

function HomeAfter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Simulasi data loadingggg
    setTimeout(() => {
      setCartCount(3); // Simulasi cart dengan 3 item
    }, 500);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Hasil pencarian untuk: ${searchTerm}`);
      setShowAlert(true);
    }, 800);
  };

  const handleAddToWishlist = (productId) => {
    setWishlist(prev => {
      const newState = {...prev};
      newState[productId] = !prev[productId];
      
      if (newState[productId]) {
        toast.success("Produk ditambahkan ke wishlist");
      } else {
        toast.info("Produk dihapus dari wishlist");
      }
      
      return newState;
    });
  };

  const iklanList = [
    {
      gambar: "https://i.pinimg.com/736x/14/a6/05/14a605f869de0328deea79d9dfc56dc7.jpg",
      alt: "Diskon 50%",
      title: "Diskon Besar 50% untuk Produk Second Branded",
      description: "Hanya 3 hari! Jangan lewatkan kesempatan ini!"
    },
    {
      gambar: "https://i.pinimg.com/736x/62/e2/9a/62e29a9c2c6ff899bbbbb208dc28776b.jpg",
      alt: "Gratis Ongkir",
      title: "Gratis Ongkir ke Seluruh Indonesia",
      description: "Minimum pembelian Rp150.000"
    },
    {
      gambar: "https://i.pinimg.com/736x/21/f2/cc/21f2ccf8f14bb4d9e30404c97a5a1b07.jpg",
      alt: "Flash Sale",
      title: "Flash Sale Setiap Hari",
      description: "Mulai pukul 12:00 - 15:00 WIB"
    },
  ];

  const kategoriList = [
    { icon: "👕", title: "Fashion" },
    { icon: "🕶️", title: "Aksesoris" },
    { icon: "📱", title: "Elektronik" },
    { icon: "🎒", title: "Tas & Ransel" },
    { icon: "🔥", title: "Promo Terbaik" },
    { icon: "📚", title: "Buku" },
    { icon: "🏠", title: "Peralatan Rumah" },
    { icon: "🧸", title: "Mainan" },
    { icon: "⚽", title: "Olahraga" },
    { icon: "💄", title: "Kosmetik" }
  ];

  const produkList = [
    {
      id: 1,
      nama: "Nike Travis Scoot",
      gambar: "https://i.pinimg.com/736x/57/93/b4/5793b4e9291df7ab6c7346d5b563cdc8.jpg",
      harga: 450000,
      diskon: 10,
      rating: 4.5,
      kondisi: "Seperti Baru"
    },
    {
      id: 2,
      nama: "Hoodie ",
      gambar: "https://i.pinimg.com/736x/52/d3/e1/52d3e125a69b221b50515b5cada44d2e.jpg",
      harga: 175000,
      diskon: 0,
      rating: 4.2,
      kondisi: "Bekas Terawat"
    },
    {
      id: 3,
      nama: "Jam Rollex",
      gambar: "https://i.pinimg.com/736x/76/80/f9/7680f946b433ba7c63bcc0f1fd9fc915.jpg",
      harga: 350000,
      diskon: 15,
      rating: 4.8,
      kondisi: "Seperti Baru"
    },
    {
      id: 4,
      nama: "Kemeja Flanel",
      gambar: "https://i.pinimg.com/736x/1c/d0/69/1cd069dd248e50c1110bfc034b8077aa.jpg",
      harga: 120000,
      diskon: 0,
      rating: 4.0,
      kondisi: "Bekas Terawat"
    },
    {
      id: 5,
      nama: "Celana Jeans",
      gambar: "https://i.pinimg.com/736x/2c/61/88/2c6188afc6d324d60819c6de917c0d77.jpg",
      harga: 200000,
      diskon: 5,
      rating: 4.3,
      kondisi: "Seperti Baru"
    },
    {
      id: 6,
      nama: "Tas Ransel",
      gambar: "https://i.pinimg.com/736x/01/90/17/019017ec7ab19159e9b599f767a8425f.jpg",
      harga: 275000,
      diskon: 0,
      rating: 4.6,
      kondisi: "Bekas Terawat"
    },
    {
      id: 7,
      nama: "Smartphone",
      gambar: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      harga: 2500000,
      diskon: 20,
      rating: 4.7,
      kondisi: "Bekas Terawat"
    },
    {
      id: 8,
      nama: "Macbook",
      gambar: "https://i.pinimg.com/736x/78/bf/a8/78bfa893270a0b531705b1c56f25674d.jpg",
      harga: 5750000,
      diskon: 10,
      rating: 4.9,
      kondisi: "Bekas Terawat"
    }
  ];


  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  // Menghitung harga setelah diskon
  const hitungDiskon = (harga, diskon) => {
    return harga - (harga * diskon / 100);
  };

  // Render bintang rating
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="product-rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star-filled">★</span>
        ))}
        {hasHalfStar && <span className="star-half">★</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={i + fullStars + (hasHalfStar ? 1 : 0)} className="star-empty">☆</span>
        ))}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          :root {
            --primary: #2d6a4f;
            --primary-light: #40916c;
            --secondary: #b7b7a4;
            --accent: #ffca3a;
            --light: #f8f9fa;
            --dark: #212529;
            --danger: #ff686b;
            --success: #52b788;
            --warning: #ffd166;
            --info: #4cc9f0;
          }
            .user-menu {
  position: relative;
  background-color: var(--primary-light);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-menu:hover {
  background-color: var(--primary);
}

.user-menu:hover .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 120%;
  left: 0;
  background-color: white;
  color: var(--dark);
  padding: 0.5rem 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  border-radius: 4px;
  min-width: 150px;
  z-index: 100;
}

.dropdown-menu a {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--dark);
  text-decoration: none;
}

.dropdown-menu a:hover {
  background-color: var(--light);
}


          body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background-color: #f5f7f9;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--primary);
            color: white;
            padding: 1rem 2rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
          }

          .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .logo:before {
            content: "";
            font-size: 1.8rem;
          }

          .search-bar {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-grow: 1;
            max-width: 600px;
            position: relative;
          }

          .search-input {
            flex-grow: 1;
            min-width: 200px;
            border-radius: 50px;
            border: none;
            padding-left: 1rem;
            height: 40px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .search-button {
            border-radius: 50px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 1.5rem;
            background-color: var(--accent);
            border: none;
            color: var(--dark);
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .search-button:hover {
            background-color: #e6b635;
            transform: translateY(-2px);
          }

          .user-actions {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }

          .cart-icon {
            position: relative;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .cart-icon:hover {
            color: var(--accent);
            transform: scale(1.1);
          }

          .cart-badge {
            position: absolute;
            top: -8px;
            right: -10px;
            background-color: var(--danger);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
          }

          .login-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            background-color: var(--primary-light);
            transition: all 0.3s ease;
          }
          
          .login-btn:hover {
            background-color: var(--primary);
            transform: translateY(-2px);
            color: var(--light);
          }

          .promo-banner {
            background: linear-gradient(to right, var(--accent), #ffd56b);
            text-align: center;
            padding: 0.75rem;
            color: var(--dark);
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 1rem;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
            100% {
              transform: scale(1);
            }
          }

          .carousel-container {
            margin: 1.5rem;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          
          .carousel-slide {
            position: relative;
            height: 300px;
            width: 100%;
          }
          
          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .carousel-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 1rem;
          }
          
          .carousel-caption h3 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
          }
          
          .carousel-caption p {
            margin-top: 0.5rem;
            font-size: 1rem;
          }

          .kategori-section {
            background-color: white;
            padding: 2rem;
            margin: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          
          .section-title {
            color: var(--dark);
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            position: relative;
            padding-left: 1rem;
          }
          
          .section-title:before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 24px;
            width: 4px;
            background-color: var(--primary);
            border-radius: 4px;
          }

          .kategori-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 1rem;
          }

          .kategori-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: var(--light);
            border-radius: 12px;
            padding: 1rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .kategori-item:hover {
            background-color: var(--primary-light);
            color: white;
            transform: translateY(-5px);
          }
          
          .kategori-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
          
          .kategori-title {
            font-size: 0.8rem;
            font-weight: 500;
            text-align: center;
          }

          .produk-section {
            background-color: white;
            padding: 2rem;
            margin: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          .produk-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1.5rem;
          }

          .produk-card {
            background-color: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            position: relative;
          }
          
          .produk-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          }
          
          .wishlist-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(255, 255, 255, 0.8);
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
          }
          
          .wishlist-btn:hover {
            background-color: white;
            transform: scale(1.1);
          }
          
          .wishlist-icon {
            font-size: 1.2rem;
            color: #adb5bd;
            transition: all 0.3s ease;
          }
          
          .wishlist-active {
            color: var(--danger);
          }
          
          .produk-img-container {
            height: 180px;
            overflow: hidden;
          }
          
          .produk-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.5s ease;
          }
          
          .produk-card:hover .produk-img {
            transform: scale(1.05);
          }
          
          .produk-info {
            padding: 1rem;
          }
          
          .produk-nama {
            font-weight: 600;
            margin-bottom: 0.5rem;
            font-size: 1rem;
            color: var(--dark);
          }
          
          .produk-harga {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          
          .harga-diskon {
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--primary);
          }
          
          .harga-asli {
            font-size: 0.9rem;
            color: #adb5bd;
            text-decoration: line-through;
          }
          
          .diskon-badge {
            background-color: var(--danger);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
          }
          
          .product-rating {
            font-size: 0.9rem;
            color: #ffc107;
            margin-bottom: 0.5rem;
          }
          
          .rating-number {
            color: #6c757d;
            font-size: 0.8rem;
            margin-left: 0.25rem;
          }
          
          .produk-kondisi {
            font-size: 0.8rem;
            color: #6c757d;
            display: inline-block;
            padding: 0.25rem 0.5rem;
            background-color: #f8f9fa;
            border-radius: 4px;
            margin-top: 0.5rem;
          }
          
          .produk-action {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
          }
          
          .btn-beli {
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 0.5rem 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            flex-grow: 1;
          }
          
          .btn-beli:hover {
            background-color: var(--primary-light);
            transform: translateY(-2px);
          }
          
          .btn-cart {
            background-color: white;
            color: var(--primary);
            border: 1px solid var(--primary);
            border-radius: 4px;
            padding: 0.5rem;
            margin-left: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .btn-cart:hover {
            background-color: var(--primary);
            color: white;
            transform: translateY(-2px);
          }

          footer {
            background-color: var(--dark);
            color: white;
            padding: 3rem 2rem;
          }
          
          .footer-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .footer-section h4 {
            color: var(--accent);
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 0.5rem;
          }
          
          .footer-section h4:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            height: 2px;
            width: 40px;
            background-color: var(--primary-light);
          }
          
          .footer-contact {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          
          .contact-item i {
            color: var(--primary-light);
          }
          
          .footer-links {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .footer-link {
            color: #ced4da;
            text-decoration: none;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .footer-link:before {
            content: "›";
            color: var(--primary-light);
            font-size: 1.2rem;
          }
          
          .footer-link:hover {
            color: white;
            transform: translateX(5px);
          }
          
          .social-media {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }
          
          .social-icon {
            background-color: #343a40;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .social-icon:hover {
            background-color: var(--primary-light);
            transform: translateY(-3px);
          }
          
          .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            margin-top: 2rem;
            border-top: 1px solid #343a40;
            color: #adb5bd;
            font-size: 0.9rem;
          }
          
          .alert-custom {
            margin: 1rem;
            border-radius: 8px;
          }
          
          .star-filled {
            color: #ffc107;
          }
          
          .star-half {
            color: #ffc107;
            position: relative;
          }
          
          .star-empty {
            color: #e0e0e0;
          }
          
          /* Responsive Styles */
          @media (max-width: 768px) {
            .header {
              padding: 1rem;
            }
            
            .search-bar {
              max-width: none;
            }
            
            .carousel-container {
              margin: 1rem;
            }
            
            .carousel-slide {
              height: 200px;
            }
            
            .kategori-section, .produk-section {
              margin: 1rem;
              padding: 1.5rem;
            }
            
            .produk-grid {
              grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }
            
            .produk-img-container {
              height: 150px;
            }
          }
          
          @media (max-width: 576px) {
            .search-input {
              min-width: 120px;
            }
            
            .kategori-grid {
              grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            }
            
            .produk-grid {
              grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            }
            
            .produk-img-container {
              height: 130px;
            }
            
            .footer-container {
              grid-template-columns: 1fr;
            }
              
          }
        `}
      </style>

      <header className="header">
        <Link to="/" className="logo">ReuseMart</Link>
        
        <form className="search-bar" onSubmit={handleSearch}>
          <Form.Control
            type="text"
            placeholder="Cari produk preloved..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button type="submit" disabled={loading} className="search-button">
            {loading ? <Spinner animation="border" size="sm" /> : <><FaSearch className="me-2" /> Cari</>}
          </Button>
        </form>
        
        <div className="user-actions">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          <div className="user-menu">
  <FaUser /> {user.name}
  <div className="dropdown-menu">
    <Link to="/profile">Profil</Link>
    <Link to="/logout">Logout</Link>
  </div>
</div>

        </div>
      </header>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="alert-custom">
          <Alert.Heading>Hasil Pencarian</Alert.Heading>
          <p>Menampilkan hasil untuk "{searchTerm}"</p>
        </Alert>
      )}

      <div className="promo-banner">Gunakan promo menarik lainnya !! 💝</div>
      
      <div className="carousel-container">
        <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {iklanList.map((iklan, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="carousel-slide">
                  <img src={iklan.gambar} alt={iklan.alt} className="carousel-image" />
                  <div className="carousel-caption">
                    <h3>{iklan.title}</h3>
                    <p>{iklan.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="kategori-section">
        <h2 className="section-title">Kategori</h2>
        <div className="kategori-grid">
          {kategoriList.map((kategori, index) => (
            <div key={index} className="kategori-item">
              <div className="kategori-icon">{kategori.icon}</div>
              <div className="kategori-title">{kategori.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="produk-section">
        <h2 className="section-title">Rekomendasi Produk</h2>
        <div className="produk-grid">
          {produkList.map((produk) => (
            <div key={produk.id} className="produk-card">
              <button 
                className="wishlist-btn"
                onClick={() => handleAddToWishlist(produk.id)}
              >
                <FaHeart className={`wishlist-icon ${wishlist[produk.id] ? 'wishlist-active' : ''}`} />
              </button>
              
              <div className="produk-img-container">
                <img src={produk.gambar} alt={produk.nama} className="produk-img" />
              </div>
              
              <div className="produk-info">
                <div className="produk-nama">{produk.nama}</div>
                
                <div className="produk-harga">
                  <span className="harga-diskon">
                    {formatRupiah(hitungDiskon(produk.harga, produk.diskon))}
                  </span>
                  
                  {produk.diskon > 0 && (
                    <span className="harga-asli">{formatRupiah(produk.harga)}</span>
                  )}
                  
                  {produk.diskon > 0 && (
                    <Badge bg="danger" className="diskon-badge">-{produk.diskon}%</Badge>
                  )}
                </div>
                
                {renderRating(produk.rating)}
                
                <span className="produk-kondisi">{produk.kondisi}</span>
                
                <div className="produk-action">
                  <Button className="btn-beli">Beli Sekarang</Button>
                  <Button className="btn-cart">
                    <FaShoppingCart />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h4>Tentang ReuseMart</h4>
            <p>ReuseMart adalah marketplace untuk produk-produk preloved berkualitas. Kami mendukung gaya hidup berkelanjutan dengan memberikan kesempatan kedua bagi barang-barang yang masih layak pakai.</p>
            
            <div className="social-media">
              <div className="social-icon">
                <FaFacebook />
              </div>
              <div className="social-icon">
                <FaTwitter />
              </div>
              <div className="social-icon">
                <FaInstagram />
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Layanan Pelanggan</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Cara Berbelanja</a>
              <a href="#" className="footer-link">Metode Pembayaran</a>
              <a href="#" className="footer-link">Pengiriman & Ongkos Kirim</a>
              <a href="#" className="footer-link">Pengembalian & Refund</a>
              <a href="#" className="footer-link">FAQ</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Informasi</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Tentang Kami</a>
              <a href="#" className="footer-link">Syarat & Ketentuan</a>
              <a href="#" className="footer-link">Kebijakan Privasi</a>
              <a href="#" className="footer-link">Blog ReuseMart</a>
              <a href="#" className="footer-link">Karir</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Hubungi Kami</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <i>📧</i>
                <span>cs@reusemart.id</span>
              </div>
              <div className="contact-item">
                <i>📱</i>
                <span>+62 812 3456 7890</span>
              </div>
              <div className="contact-item">
                <i>🏢</i>
                <span>Jl. Eco Living No. 123, Jakarta Selatan</span>
              </div>
              <div className="contact-item">
                <i>⏰</i>
                <span>Senin - Jumat: 08.00 - 17.00 WIB</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ReuseMart. Semua hak dilindungi.</p>
        </div>
      </footer>
    </>
  );
}

export default HomeAfter;