import { useState, useEffect } from "react";
import { Button, Alert, Spinner, Form, Badge, Container, Row, Col, Nav, Navbar, NavDropdown, InputGroup } from "react-bootstrap";
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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setCartCount(3);
    }, 1000);
  }, []);
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
    setTimeout(() => {
      setCartCount(3);
    }, 800000);
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

  const hitungDiskon = (harga, diskon) => {
    return harga - (harga * diskon / 100);
  };

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
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          :root {
            --primary: #937f6a;
            --primary-light: #b4a95c;
            --secondary: #5a374b;
            --accent: #b4a95c;
            --light: #f8f9fa;
            --dark: #3a4550;
            --danger: #ff686b;
          }

          body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background-color: #f5f7f9;
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

          .wishlist-icon {
            font-size: 1.2rem;
            transition: all 0.3s ease;
            color: #adb5bd;
          }

          .wishlist-active {
            color: var(--danger);
          }
        `}</style>

        <Navbar expand="lg" variant="dark" style={{backgroundColor: 'var(--primary)'}} sticky="top" className="px-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="/" className="fw-bold" style={{color: 'var(--light)'}}>ReuseMart</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex ms-auto me-auto" onSubmit={handleSearch} style={{maxWidth: '600px', width: '100%'}}>
                <InputGroup>
                  <Form.Control
                    type="search"
                    placeholder="Cari produk preloved..."
                    className="me-2 rounded-pill"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    aria-label="Search"
                  />
                  <Button type="submit" variant="warning" className="rounded-pill px-4" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : <><FaSearch className="me-2" /> Cari</>}
                  </Button>
                </InputGroup>
              </Form>

              <Nav className="ms-auto align-items-center gap-3">
                <Nav.Link as={Link} to="/keranjang" className="position-relative" style={{color: 'var(--light)', fontSize: '1.5rem'}}>
                  <FaShoppingCart />
                  {cartCount > 0 && (
                    <Badge bg="danger" pill style={{position: 'absolute', top: '-8px', right: '-10px'}}>
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>

                <NavDropdown 
                  title={<><FaUser className="me-2" /> {user.name}</>} 
                  id="user-menu-dropdown" 
                  align="end"
                  show={showUserMenu}
                  onToggle={() => setShowUserMenu(!showUserMenu)}
                  menuVariant="light"
                >
                  <NavDropdown.Item as={Link} to="/profil-pembeli" onClick={() => setShowUserMenu(false)}>Profil</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/" onClick={() => { setShowUserMenu(false); toast.info("Anda telah logout."); }}>Logout</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/info-tambahan" onClick={() => setShowUserMenu(false)}>Info Tambahan</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="my-3">
              <Alert.Heading>Hasil Pencarian</Alert.Heading>
              <p>Menampilkan hasil untuk "{searchTerm}"</p>
            </Alert>
          )}

          <div className="promo-banner text-center my-3 p-3 rounded" style={{
            background: 'linear-gradient(to right, var(--accent), #ffd56b)', 
            color: 'var(--dark)', 
            fontWeight: 'bold',
            letterSpacing: '1px',
            animation: 'pulse 2s infinite'
          }}>
            Gunakan promo menarik lainnya !! 💝
          </div>

          {/* Carousel */}
          <div id="homeCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
            <div className="carousel-inner rounded shadow-sm">
              {iklanList.map((iklan, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={iklan.gambar} alt={iklan.alt} className="d-block w-100" style={{height: '300px', objectFit: 'cover'}} />
                  <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                    <h3>{iklan.title}</h3>
                    <p>{iklan.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
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

        {/* Kategori */}
        <section className="kategori-section bg-white rounded shadow-sm p-4 mb-4">
          <h2 className="section-title" style={{color: 'var(--dark)', fontWeight: '600', marginBottom: '1.5rem', position: 'relative', paddingLeft: '1rem'}}>
            Kategori
            <span style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              height: '24px',
              width: '4px',
              backgroundColor: 'var(--primary)',
              borderRadius: '4px'
            }} />
          </h2>
          <Row xs={2} sm={4} md={5} lg={10} className="g-3">
            {kategoriList.map((kategori, index) => (
              <Col key={index} className="d-flex flex-column align-items-center justify-content-center rounded p-3" style={{
                backgroundColor: 'var(--light)', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--light)';
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.transform = 'none';
              }}>
                <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{kategori.icon}</div>
                <div style={{fontSize: '0.8rem', fontWeight: '500', textAlign: 'center'}}>{kategori.title}</div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Produk */}
        <section className="produk-section bg-white rounded shadow-sm p-4 mb-5">
          <h2 className="section-title" style={{color: 'var(--dark)', fontWeight: '600', marginBottom: '1.5rem', position: 'relative', paddingLeft: '1rem'}}>
            Rekomendasi Produk
            <span style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              height: '24px',
              width: '4px',
              backgroundColor: 'var(--primary)',
              borderRadius: '4px'
            }} />
          </h2>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {produkList.map((produk) => (
              <Col key={produk.id}>
                <div className="produk-card position-relative rounded shadow-sm overflow-hidden" style={{transition: 'all 0.3s ease'}}>
                  <Button
                    className="wishlist-btn position-absolute top-0 end-0 m-2 p-2 rounded-circle"
                    variant="light"
                    onClick={() => handleAddToWishlist(produk.id)}
                    style={{ zIndex: 10, color: wishlist[produk.id] ? 'var(--danger)' : '#adb5bd' }}
                  >
                    <FaHeart />
                  </Button>

                  <div className="produk-img-container" style={{height: '180px', overflow: 'hidden'}}>
                    <img src={produk.gambar} alt={produk.nama} className="w-100 h-100" style={{objectFit: 'cover', transition: 'transform 0.5s ease'}} />
                  </div>

                  <div className="produk-info p-3">
                    <div className="produk-nama fw-semibold mb-2" style={{color: 'var(--dark)', fontSize: '1rem'}}>{produk.nama}</div>

                    <div className="produk-harga d-flex align-items-center gap-2 mb-2">
                      <span className="harga-diskon fw-bold" style={{color: 'var(--primary)', fontSize: '1.1rem'}}>
                        {formatRupiah(hitungDiskon(produk.harga, produk.diskon))}
                      </span>
                      {produk.diskon > 0 && (
                        <span className="harga-asli text-muted text-decoration-line-through">
                          {formatRupiah(produk.harga)}
                        </span>
                      )}
                      {produk.diskon > 0 && (
                        <Badge bg="danger" className="diskon-badge">-{produk.diskon}%</Badge>
                      )}
                    </div>

                    {renderRating(produk.rating)}

                    <span className="produk-kondisi d-inline-block mt-1 px-2 py-1 rounded" style={{fontSize: '0.8rem', color: '#6c757d', backgroundColor: '#f8f9fa'}}>
                      {produk.kondisi}
                    </span>

                    <div className="produk-action d-flex justify-content-between mt-3">
                      <Button className="btn-beli flex-grow-1 me-2" style={{backgroundColor: 'var(--primary)', color: 'white', border: 'none'}}>
                        Beli Sekarang
                      </Button>
                      <Button variant="outline-primary" className="btn-cart d-flex align-items-center justify-content-center p-2" style={{minWidth: '44px'}}>
                        <FaShoppingCart />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      </Container>

      <footer style={{backgroundColor: 'var(--dark)', color: 'white', padding: '3rem 2rem'}}>
        <Container>
          <Row xs={1} md={4} className="gap-4">
            <Col>
              <h4 style={{color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '1.5rem', position: 'relative', paddingBottom: '0.5rem'}}>
                Tentang ReuseMart
                <span style={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: '2px',
                  width: '40px',
                  backgroundColor: 'var(--primary-light)'
                }} />
              </h4>
              <p>ReuseMart adalah marketplace untuk produk-produk preloved berkualitas. Kami mendukung gaya hidup berkelanjutan dengan memberikan kesempatan kedua bagi barang-barang yang masih layak pakai.</p>
              <div className="social-media d-flex gap-3 mt-3">
                <div className="social-icon d-flex align-items-center justify-content-center rounded-circle bg-secondary" style={{width: '36px', height: '36px', cursor: 'pointer'}}>
                  <FaFacebook color="white" />
                </div>
                <div className="social-icon d-flex align-items-center justify-content-center rounded-circle bg-secondary" style={{width: '36px', height: '36px', cursor: 'pointer'}}>
                  <FaTwitter color="white" />
                </div>
                <div className="social-icon d-flex align-items-center justify-content-center rounded-circle bg-secondary" style={{width: '36px', height: '36px', cursor: 'pointer'}}>
                  <FaInstagram color="white" />
                </div>
              </div>
            </Col>

            <Col>
              <h4 style={{color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '1.5rem', position: 'relative', paddingBottom: '0.5rem'}}>
                Layanan Pelanggan
                <span style={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: '2px',
                  width: '40px',
                  backgroundColor: 'var(--primary-light)'
                }} />
              </h4>
              <Nav className="flex-column">
                {["Cara Berbelanja", "Metode Pembayaran", "Pengiriman & Ongkos Kirim", "Pengembalian & Refund", "FAQ"].map((item, i) => (
                  <Nav.Link key={i} href="#" className="text-light ps-0">
                    &rsaquo; {item}
                  </Nav.Link>
                ))}
              </Nav>
            </Col>

            <Col>
              <h4 style={{color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '1.5rem', position: 'relative', paddingBottom: '0.5rem'}}>
                Informasi
                <span style={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: '2px',
                  width: '40px',
                  backgroundColor: 'var(--primary-light)'
                }} />
              </h4>
              <Nav className="flex-column">
                {["Tentang Kami", "Syarat & Ketentuan", "Kebijakan Privasi", "Blog ReuseMart", "Karir"].map((item, i) => (
                  <Nav.Link key={i} href="#" className="text-light ps-0">
                    &rsaquo; {item}
                  </Nav.Link>
                ))}
              </Nav>
            </Col>

            <Col>
              <h4 style={{color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '1.5rem', position: 'relative', paddingBottom: '0.5rem'}}>
                Hubungi Kami
                <span style={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: '2px',
                  width: '40px',
                  backgroundColor: 'var(--primary-light)'
                }} />
              </h4>
              <div className="footer-contact d-flex flex-column gap-3">
                <div className="contact-item d-flex align-items-center gap-3">
                  <span role="img" aria-label="email">📧</span> cs@reusemart.id
                </div>
                <div className="contact-item d-flex align-items-center gap-3">
                  <span role="img" aria-label="phone">📱</span> +62 812 3456 7890
                </div>
                <div className="contact-item d-flex align-items-center gap-3">
                  <span role="img" aria-label="office">🏢</span> Jl. Eco Living No. 123, Jakarta Selatan
                </div>
                <div className="contact-item d-flex align-items-center gap-3">
                  <span role="img" aria-label="clock">⏰</span> Senin - Jumat: 08.00 - 17.00 WIB
                </div>
              </div>
            </Col>
          </Row>

          <div className="footer-bottom text-center mt-5 pt-3 border-top border-secondary" style={{color: '#adb5bd', fontSize: '0.9rem'}}>
            &copy; {new Date().getFullYear()} ReuseMart. Semua hak dilindungi.
          </div>
        </Container>
      </footer>
    </>
  );
}

export default HomeAfter;