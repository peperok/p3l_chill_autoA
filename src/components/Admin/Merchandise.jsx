import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Heart,
  Star,
  Filter,
  Search,
  Grid3X3,
  List,
  Eye,
  ShoppingBag,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

const colors = {
  primary: '#5a374b',       // sidebar dan heading
  secondary: '#937f6a',     // tombol & badge
  tertiary: '#3a4550',      // teks & outline
  accent: '#937f6a'         // badge dan highlight agar konsisten
};

<div style={{
  textAlign: 'center',
  padding: '2rem 1rem',
  color: colors.primary,
  fontWeight: 600
}}></div>


// Custom CSS untuk merchandise layout
const customStyles = `
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .hero-section {
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    color: white;
    border-radius: 20px;
    padding: 3rem 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
  }
  
  .filters-section {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }
  
  .search-container {
    position: relative;
    flex: 1;
    min-width: 300px;
  }
  
  .search-input {
    width: 100%;
    padding: 12px 20px 12px 50px;
    border: 2px solid #e0e0e0;
    border-radius: 25px;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
  }
  
  .search-input:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
  
  .search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
  }
  
  .filter-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .view-toggle {
    display: flex;
    background: #f8f9fa;
    border-radius: 12px;
    padding: 4px;
  }
  
  .view-btn {
    border: none;
    background: transparent;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #6c757d;
  }
  
  .view-btn.active {
    background: ${colors.primary};
    color: white;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .product-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    position: relative;
    group: hover;
  }
  
  .product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
  
  .product-image {
    position: relative;
    height: 250px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .product-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: ${colors.accent};
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    z-index: 2;
  }
  
  .product-actions {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
  }
  
  .product-card:hover .product-actions {
    opacity: 1;
    transform: translateX(0);
  }
  
  .action-btn {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: white;
    color: ${colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .action-btn:hover {
    background: ${colors.primary};
    color: white;
    transform: scale(1.1);
  }
  
  .product-info {
    padding: 1.5rem;
  }
  
  .product-category {
    color: ${colors.accent};
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }
  
  .product-title {
    font-size: 18px;
    font-weight: 700;
    color: ${colors.tertiary};
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
  }
  
  .product-description {
    color: #6c757d;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 1rem;
  }
  
  .product-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .stars {
    display: flex;
    gap: 2px;
  }
  
  .star {
    color: #ffc107;
  }
  
  .rating-text {
    font-size: 14px;
    color: #6c757d;
  }
  
  .product-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .price-current {
    font-size: 20px;
    font-weight: 700;
    color: ${colors.primary};
  }
  
  .price-original {
    font-size: 16px;
    color: #6c757d;
    text-decoration: line-through;
    margin-left: 0.5rem;
  }
  
  .product-footer {
    display: flex;
    gap: 0.5rem;
  }
  
  .btn {
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex: 1;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    color: white;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
  
  .btn-outline {
    background: white;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
  }
  
  .btn-outline:hover {
    background: ${colors.primary};
    color: white;
  }
  
  .filter-btn {
    background: white;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .filter-btn:hover, .filter-btn.active {
    background: ${colors.primary};
    color: white;
  }
  
  .stats-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.12);
  }
  
  .stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    background: linear-gradient(135deg, ${colors.primary}20 0%, ${colors.accent}20 100%);
  }
  
  .stat-number {
    font-size: 24px;
    font-weight: 700;
    color: ${colors.tertiary};
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: #6c757d;
    font-size: 14px;
  }
  
  @media (max-width: 1024px) {
    .filters-section {
      flex-direction: column;
      align-items: stretch;
    }
    
    .search-container {
      min-width: unset;
    }
    
    .filter-controls {
      justify-content: center;
    }
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    .hero-section {
      padding: 2rem 1rem;
    }
    
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .stats-section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const MerchandiseDisplay = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());

  // Data merchandise
  const products = [
    {
      id: 1,
      name: 'Kaos Band Classic Rock',
      category: 'Kaos',
      price: 150000,
      originalPrice: 200000,
      rating: 4.8,
      reviews: 124,
      description: 'Kaos dengan desain band rock klasik, 100% cotton premium',
      badge: 'Best Seller',
      image: null
    },
    {
      id: 2,
      name: 'Hoodie Streetwear Urban',
      category: 'Hoodie',
      price: 350000,
      originalPrice: 450000,
      rating: 4.9,
      reviews: 89,
      description: 'Hoodie dengan gaya streetwear modern, bahan fleece berkualitas',
      badge: 'New',
      image: null
    },
    {
      id: 3,
      name: 'Tote Bag Canvas Premium',
      category: 'Tas',
      price: 120000,
      originalPrice: 160000,
      rating: 4.7,
      reviews: 203,
      description: 'Tote bag dari bahan canvas tebal dengan desain minimalis',
      badge: 'Sale',
      image: null
    },
    {
      id: 4,
      name: 'Pin Enamel Set Collector',
      category: 'Aksesoris',
      price: 75000,
      originalPrice: 100000,
      rating: 4.6,
      reviews: 67,
      description: 'Set pin enamel dengan berbagai desain unik untuk koleksi',
      badge: 'Limited',
      image: null
    },
    {
      id: 5,
      name: 'Mug Keramik Artisan',
      category: 'Drinkware',
      price: 95000,
      originalPrice: 125000,
      rating: 4.8,
      reviews: 156,
      description: 'Mug keramik buatan tangan dengan desain eksklusif',
      badge: 'Handmade',
      image: null
    },
    {
      id: 6,
      name: 'Sticker Pack Vintage',
      category: 'Aksesoris',
      price: 45000,
      originalPrice: 60000,
      rating: 4.5,
      reviews: 312,
      description: 'Paket sticker dengan tema vintage untuk laptop dan gadget',
      badge: 'Popular',
      image: null
    }
  ];

  const categories = ['all', 'Kaos', 'Hoodie', 'Tas', 'Aksesoris', 'Drinkware'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} className="star" fill="currentColor" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" size={14} className="star" fill="currentColor" style={{ opacity: 0.5 }} />);
    }
    
    return stars;
  };

  return (
    <div>
      <style>{customStyles}</style>
      
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 style={{ fontSize: '48px', margin: '0 0 1rem 0', fontWeight: '800' }}>
              Merchandise Collection
            </h1>
            <p style={{ fontSize: '20px', margin: '0 0 2rem 0', opacity: 0.9 }}>
              Temukan koleksi merchandise eksklusif dengan kualitas premium
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700' }}>500+</div>
                <div style={{ opacity: 0.8 }}>Produk Tersedia</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700' }}>4.8★</div>
                <div style={{ opacity: 0.8 }}>Rating Rata-rata</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700' }}>50k+</div>
                <div style={{ opacity: 0.8 }}>Happy Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} color={colors.primary} />
            </div>
            <div className="stat-number">98%</div>
            <div className="stat-label">Kepuasan Pelanggan</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Award size={24} color={colors.accent} />
            </div>
            <div className="stat-number">Premium</div>
            <div className="stat-label">Kualitas Terjamin</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Zap size={24} color={colors.secondary} />
            </div>
            <div className="stat-number">24h</div>
            <div className="stat-label">Pengiriman Cepat</div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Cari merchandise favorit Anda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Semua' : category}
                </button>
              ))}
            </div>
            
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.badge && (
                  <div className="product-badge">{product.badge}</div>
                )}
                
                <div className="product-actions">
                  <button
                    className="action-btn"
                    onClick={() => toggleFavorite(product.id)}
                    title="Tambah ke Wishlist"
                  >
                    <Heart 
                      size={18} 
                      fill={favorites.has(product.id) ? 'currentColor' : 'none'} 
                    />
                  </button>
                  <button className="action-btn" title="Lihat Detail">
                    <Eye size={18} />
                  </button>
                </div>
                
                <ShoppingBag size={64} color={colors.primary} style={{ opacity: 0.3 }} />
              </div>
              
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-rating">
                  <div className="stars">
                    {renderStars(product.rating)}
                  </div>
                  <span className="rating-text">
                    {product.rating} ({product.reviews} ulasan)
                  </span>
                </div>
                
                <div className="product-price">
                  <div>
                    <span className="price-current">
                      Rp {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="price-original">
                        Rp {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="product-footer">
                  <button className="btn btn-primary">
                    <ShoppingCart size={18} />
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            color: '#6c757d'
          }}>
            <ShoppingBag size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Produk tidak ditemukan</h3>
            <p>Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchandiseDisplay;