import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Tag,
  CreditCard,
  MapPin,
  ArrowLeft,
  Check,
  Shield,
  Truck
} from 'lucide-react';

// Color palette
const colors = {
  primary: '#937f6a',
  secondary: '#5a374b',
  tertiary: '#3a4550',
  accent: '#b4a95c'
};

// Custom CSS untuk web layout
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .cart-header {
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    color: white;
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
  
  .main-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
  
  .cart-items-section {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  }
  
  .cart-item {
    border-radius: 15px;
    border: 1px solid #e0e0e0;
    margin-bottom: 16px;
    transition: all 0.3s ease;
    background: white;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 1.5rem;
    align-items: center;
  }
  
  .cart-item:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    transform: translateY(-2px);
    border-color: ${colors.primary};
  }
  
  .item-image {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .item-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    background: #f8f9fa;
    border-radius: 12px;
    padding: 4px;
  }
  
  .quantity-btn {
    border: none;
    color: ${colors.primary};
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  
  .quantity-btn:hover {
    background-color: ${colors.primary};
    color: white;
  }
  
  .quantity-input {
    border: none;
    text-align: center;
    width: 60px;
    font-weight: bold;
    background: transparent;
    outline: none;
    font-size: 16px;
  }
  
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .promo-section, .shipping-section, .summary-section {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  }
  
  .promo-section {
    background: linear-gradient(135deg, ${colors.accent}15 0%, ${colors.accent}25 100%);
    border: 2px dashed ${colors.accent};
  }
  
  .summary-section {
    background: linear-gradient(135deg, ${colors.tertiary} 0%, ${colors.secondary} 100%);
    color: white;
    position: sticky;
    top: 2rem;
  }
  
  .btn {
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .btn-primary-custom {
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    color: white;
    width: 100%;
    padding: 16px 24px;
    font-size: 16px;
  }
  
  .btn-primary-custom:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  
  .btn-secondary-custom {
    background-color: ${colors.secondary};
    color: white;
  }
  
  .btn-secondary-custom:hover {
    background-color: ${colors.tertiary};
  }
  
  .btn-outline-danger {
    border: 1px solid #dc3545;
    color: #dc3545;
    background: white;
    padding: 8px 12px;
  }
  
  .btn-outline-danger:hover {
    background-color: #dc3545;
    color: white;
  }
  
  .btn-outline-secondary {
    border: 1px solid #6c757d;
    color: #6c757d;
    background: white;
  }
  
  .btn-outline-secondary:hover {
    background-color: #6c757d;
    color: white;
  }
  
  .form-control {
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 14px;
    width: 100%;
    outline: none;
    transition: all 0.3s ease;
  }
  
  .form-control:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
  
  .form-check {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .form-check:hover {
    border-color: ${colors.primary};
    background: ${colors.primary}10;
  }
  
  .form-check-input:checked + .form-check-label {
    color: ${colors.primary};
    font-weight: 600;
  }
  
  .form-check-input {
    margin-right: 1rem;
    width: 20px;
    height: 20px;
  }
  
  .form-check-label {
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    align-items: center;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${colors.tertiary};
  }
  
  .section-title.white {
    color: white;
  }
  
  .price-large {
    font-size: 20px;
    font-weight: 700;
    color: ${colors.primary};
  }
  
  .price-summary {
    font-size: 16px;
    font-weight: 600;
  }
  
  .divider {
    border: 0;
    border-top: 2px solid rgba(255,255,255,0.2);
    margin: 1rem 0;
  }
  
  .success-text {
    color: #198754;
    font-weight: 600;
  }
  
  .flex {
    display: flex;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .items-center {
    align-items: center;
  }
  
  .justify-between {
    justify-content: space-between;
  }
  
  .gap-2 {
    gap: 0.5rem;
  }
  
  .gap-4 {
    gap: 1rem;
  }
  
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  
  .text-sm {
    font-size: 14px;
  }
  
  .text-muted {
    color: #6c757d;
  }
  
  .trust-badges {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(255,255,255,0.1);
    border-radius: 12px;
  }
  
  .trust-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 12px;
    color: rgba(255,255,255,0.9);
  }
  
  @media (max-width: 1024px) {
    .main-content {
      grid-template-columns: 1fr;
    }
    
    .container {
      padding: 1rem;
    }
  }
  
  @media (max-width: 768px) {
    .cart-item {
      grid-template-columns: 80px 1fr;
      gap: 1rem;
    }
    
    .item-actions {
      grid-column: 1 / -1;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;
    }
    
    .item-image {
      width: 80px;
      height: 80px;
    }
  }
`;

const KeranjangBelanja = () => {
  // State untuk item keranjang
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sepatu Nike Travis Scoot',
      price: 400000,
      quantity: 1,
      image: null,
      size: '42',
      color: 'Hitam',
      brand: 'Nike'
    },
    {
      id: 2,
      name: 'kemeja Flanel',
      price: 297500,
      quantity: 2,
      image: null,
      size: 'L',
      color: 'Navy',
      brand: 'Rollex'
    },
    {
      id: 3,
      name: 'Celana Jeans Levi\'s 501',
      price: 190000,
      quantity: 1,
      image: null,
      size: '32',
      color: 'Blue',
      brand: 'Levi\'s'
    }
  ]);

  // State untuk kode promo
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // State metode pengiriman
  const [shippingMethod, setShippingMethod] = useState('kurir'); // 'kurir' atau 'pickup'

  // State ongkos kirim, jika metode 'kurir'
  const [shippingCost, setShippingCost] = useState(25000);

  // State alamat pengiriman
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Rumah', details: 'Jl. Merpati No. 123, Jakarta Selatan' },
    { id: 2, label: 'Kantor', details: 'Jl. Sudirman No. 456, Jakarta Pusat' },
    { id: 3, label: 'Tempat Saudara', details: 'Jl. Melati No. 789, Bandung' },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(1);

  // Fungsi update kuantitas item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Fungsi hapus item
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Fungsi terapkan kode promo
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'DISKON10') {
      setAppliedPromo({
        code: 'DISKON10',
        discount: 0.1,
        description: 'Diskon 10%'
      });
    } else if (promoCode.toUpperCase() === 'GRATIS25') {
      setAppliedPromo({
        code: 'GRATIS25',
        discount: 25000,
        description: 'Gratis Ongkir'
      });
    } else {
      alert('Kode promo tidak valid');
    }
  };

  // Kalkulasi subtotal dan diskon
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promoDiscount = appliedPromo ? 
    (appliedPromo.discount < 1 ? subtotal * appliedPromo.discount : appliedPromo.discount) : 0;

  // Ongkos kirim final tergantung metode dan promo
  const finalShipping = 
    shippingMethod === 'pickup' ? 0 :
    (appliedPromo && appliedPromo.code === 'GRATIS25' ? 0 : shippingCost);

  // Total akhir
  const total = subtotal - promoDiscount + finalShipping;

  return (
    <div>
      <style>{customStyles}</style>

      <div className="container">
        {/* Header Keranjang */}
        <div className="cart-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '12px' }}>
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-4">
                <ShoppingCart size={32} />
                <div>
                  <h1 style={{ fontSize: '28px', margin: 0, fontWeight: '700' }}>Keranjang Belanja</h1>
                  <p style={{ margin: 0, opacity: 0.9 }}>{cartItems.length} item dipilih</p>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>
              Total: Rp {total.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="main-content">
          {/* Bagian Kiri - Daftar Item */}
          <div>
            <div className="cart-items-section">
              <h2 className="section-title">
                <ShoppingCart size={24} />
                Item Pesanan
              </h2>

              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <ShoppingCart size={32} color={colors.primary} />
                    )}
                  </div>

                  <div className="item-details">
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: colors.tertiary }}>
                      {item.name}
                    </h3>
                    <p style={{ margin: 0, color: colors.accent, fontWeight: '600' }}>
                      {item.brand}
                    </p>
                    <div className="flex gap-4 text-sm text-muted">
                      <span>Ukuran: {item.size}</span>
                      <span>Warna: {item.color}</span>
                    </div>
                    <div className="price-large">
                      Rp {item.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="item-actions">
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                      Hapus
                    </button>

                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={18} />
                      </button>
                      <input 
                        type="number" 
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bagian Kanan - Sidebar */}
          <div className="sidebar">
            {/* Kode Promo */}
            <div className="promo-section">
              <h3 className="section-title">
                <Tag size={24} />
                Kode Promo
              </h3>

              {appliedPromo ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check size={20} className="success-text" />
                    <span className="success-text">
                      {appliedPromo.description} diterapkan
                    </span>
                  </div>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setAppliedPromo(null);
                      setPromoCode('');
                    }}
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Masukkan kode promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button 
                    className="btn btn-secondary-custom"
                    onClick={applyPromoCode}
                  >
                    Terapkan
                  </button>
                </div>
              )}

              <div className="text-sm text-muted" style={{ marginTop: '0.75rem' }}>
                Coba: <strong>DISKON10</strong> (diskon 10%) atau <strong>GRATIS25</strong> (gratis ongkir)
              </div>
            </div>

            {/* Pilihan Metode Pengiriman */}
            <div className="shipping-section">
              <h3 className="section-title">
                <Truck size={24} />
                Pilihan Metode Pengiriman
              </h3>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shippingMethod"
                  id="kurir"
                  checked={shippingMethod === 'kurir'}
                  onChange={() => {
                    setShippingMethod('kurir');
                    setShippingCost(25000); // reset ke reguler default
                  }}
                />
                <label className="form-check-label" htmlFor="kurir">
                  Kurir
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shippingMethod"
                  id="pickup"
                  checked={shippingMethod === 'pickup'}
                  onChange={() => setShippingMethod('pickup')}
                />
                <label className="form-check-label" htmlFor="pickup">
                  Ambil Sendiri (Pickup) - Gratis
                </label>
              </div>

              {/* Jika pilih kurir, tampilkan opsi jenis kurir */}
              {shippingMethod === 'kurir' && (
                <>
                  <div className="form-check" style={{ marginLeft: '1.5rem' }}>
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="shippingOption" 
                      id="regular"
                      checked={shippingCost === 25000}
                      onChange={() => setShippingCost(25000)}
                    />
                    <label className="form-check-label" htmlFor="regular">
                      Reguler (3-5 hari)
                      <span style={{ marginLeft: '0.5rem', fontWeight: '600', color: colors.primary }}>
                        Rp 25.000
                      </span>
                    </label>
                  </div>

                  <div className="form-check" style={{ marginLeft: '1.5rem' }}>
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="shippingOption" 
                      id="express"
                      checked={shippingCost === 50000}
                      onChange={() => setShippingCost(50000)}
                    />
                    <label className="form-check-label" htmlFor="express">
                      Express (1-2 hari)
                      <span style={{ marginLeft: '0.5rem', fontWeight: '600', color: colors.primary }}>
                        Rp 50.000
                      </span>
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* Pilih Alamat Pengiriman */}
            <div className="shipping-section" style={{ marginTop: '1rem' }}>
              <h3 className="section-title">
                <MapPin size={24} />
                Pilih Alamat Pengiriman
              </h3>

              {addresses.map((address) => (
                <div className="form-check" key={address.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="address"
                    id={`address-${address.id}`}
                    checked={selectedAddressId === address.id}
                    onChange={() => setSelectedAddressId(address.id)}
                    disabled={shippingMethod === 'pickup'} // Jika pickup, nonaktifkan pilihan alamat
                  />
                  <label className="form-check-label" htmlFor={`address-${address.id}`}>
                    <div style={{ fontWeight: '600' }}>{address.label}</div>
                    <div className="text-sm text-muted">{address.details}</div>
                  </label>
                </div>
              ))}

              {/* Jika metode pickup, tampilkan info lokasi pickup */}
              {shippingMethod === 'pickup' && (
                <div style={{ marginTop: '0.5rem', fontStyle: 'italic', color: colors.primary }}>
                  * Anda akan mengambil pesanan di toko kami: Jl. Eco Living No. 123, Jakarta Selatan
                </div>
              )}
            </div>

            {/* Ringkasan Pesanan */}
            <div className="summary-section">
              <h3 className="section-title white">
                <CreditCard size={24} />
                Ringkasan Pesanan
              </h3>

              <div className="flex justify-between mb-2">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} item)</span>
                <span className="price-summary">Rp {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Ongkos Kirim</span>
                <span className="price-summary">Rp {finalShipping.toLocaleString()}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between mb-2 success-text">
                  <span>Diskon ({appliedPromo.description})</span>
                  <span>-Rp {promoDiscount.toLocaleString()}</span>
                </div>
              )}

              <hr className="divider" />

              <div className="flex justify-between mb-4">
                <strong style={{ fontSize: '18px' }}>Total</strong>
                <strong style={{ fontSize: '20px' }}>Rp {total.toLocaleString()}</strong>
              </div>

              <button className="btn btn-primary-custom">
                <CreditCard size={24} />
                Lanjut ke Pembayaran
              </button>

              <div className="trust-badges">
                <div className="trust-badge">
                  <Shield size={16} />
                  <span>Pembayaran Aman</span>
                </div>
                <div className="trust-badge">
                  <Truck size={16} />
                  <span>Pengiriman Terjamin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeranjangBelanja;
