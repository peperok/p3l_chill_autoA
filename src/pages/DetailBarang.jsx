// src/components/DetailBarang.jsx
import React from 'react';

const DetailBarang = () => {
  const product = {
    name: "Wireless Earphone",
    description: `Nikmati kebebasan mendengarkan musik tanpa kabel dengan Wireless Earphone Bluetooth berwarna hitam. 
Didesain untuk kenyamanan dan kualitas suara optimal, earphone ini cocok untuk aktivitas sehari-hari, olahraga, hingga bekerja dari mana saja.

✅ Fitur Utama:
- Koneksi Bluetooth 5.0: koneksi cepat, stabil, hemat daya hingga 10 meter.
- Desain ergonomis & ringan: pas di telinga dan nyaman digunakan dalam waktu lama.
- Kualitas suara jernih & bass dalam: cocok untuk musik, film, atau panggilan.
- Kontrol sentuh pintar: atur volume, panggilan, dan lagu dengan sentuhan.
- Baterai tahan lama: 4–5 jam pemakaian + charging case hingga total 20 jam.
- Charging case kompak: port USB Type-C, mudah dibawa ke mana saja.

🔧 Spesifikasi Teknis:
- Bluetooth: 5.0
- Jarak koneksi: hingga 10 meter
- Daya tahan: 4–5 jam (earphone), total 20 jam (dengan case)
- Waktu pengisian: ±1 jam
- Port: USB Type-C
- Kompatibilitas: Android, iOS, laptop, perangkat Bluetooth lainnya

📦 Isi Paket:
- 1 pasang Wireless Earphone (kiri & kanan)
- 1 buah Charging Case
- 1 kabel USB Type-C
- 1 set eartips (S, M, L)
- Buku panduan pengguna`,
    price: 90000,
    isAvailable: true,
    imageUrl: "https://i.pinimg.com/736x/0a/4d/8a/0a4d8acd66c1f2b3a8ce49a03ae768fe.jpg",
  };

  const formatPrice = (price) => `Rp${price.toLocaleString('id-ID')}`;

  const handleAddToCart = () => {
    if (!product.isAvailable) {
      alert("Maaf, barang sudah terjual.");
      return;
    }
    alert(`"${product.name}" berhasil ditambahkan ke keranjang!`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div style={styles.logo}>Reuse Mart</div>
      </div>

      <div style={styles.productSection}>
        <img src={product.imageUrl} alt={product.name} style={styles.productImage} />

        <div style={styles.productInfo}>
          <h1 style={styles.productName}>{product.name}</h1>
          <pre style={styles.productDescription}>{product.description}</pre>
          <div style={styles.productPrice}>{formatPrice(product.price)}</div>
          <div
            style={{
              ...styles.availability,
              color: product.isAvailable ? 'green' : 'red',
            }}
          >
            {product.isAvailable ? 'Barang tersedia' : 'Barang sudah terjual'}
          </div>

          {product.isAvailable && (
            <button style={styles.button} onClick={handleAddToCart}>
              Tambahkan ke Keranjang
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  navbar: {
    backgroundColor: '#937f6a',
    color: '#fff',
    padding: '16px',
    fontSize: '20px',
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  logo: {
    fontSize: '24px',
  },
  productSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '24px',
    padding: '24px',
    backgroundColor: '#fff',
    maxWidth: '900px',
    margin: '24px auto',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flexWrap: 'wrap',
  },
  productImage: {
    flex: '1 1 300px',
    maxWidth: '400px',
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  productInfo: {
    flex: '1 1 300px',
    textAlign: 'left',
  },
  productName: {
    fontSize: '22px',
    marginBottom: '12px',
  },
  productDescription: {
    fontSize: '16px',
    color: '#555',
    whiteSpace: 'pre-wrap',
    marginBottom: '16px',
  },
  productPrice: {
    fontSize: '24px',
    color: '#ee4d2d',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  availability: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#ee4d2d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default DetailBarang;
