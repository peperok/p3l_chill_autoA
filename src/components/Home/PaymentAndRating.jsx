import React, { useState, useEffect } from 'react';

const PaymentAndRating = ({ productId }) => {
  const [userRating, setUserRating] = useState(0);
  const [allRatings, setAllRatings] = useState([
    { productId: 1, rating: 4 },
    { productId: 1, rating: 5 },
    { productId: 1, rating: 3 },
    { productId: 2, rating: 5 },
  ]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const ratingsForProduct = allRatings.filter(r => r.productId === productId);
    if (ratingsForProduct.length > 0) {
      const avg = ratingsForProduct.reduce((sum, r) => sum + r.rating, 0) / ratingsForProduct.length;
      setAverageRating(avg.toFixed(1));
    } else {
      setAverageRating(0);
    }
  }, [allRatings, productId]);

  const handleUserRate = (star) => {
    setUserRating(star);
    setAllRatings(prev => [...prev, { productId, rating: star }]);
  };

  const RatingStars = ({ currentRating, onRate }) => {
    return (
      <div style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => onRate(star)}
            onKeyDown={(e) => { if(e.key === 'Enter') onRate(star); }}
            role="button"
            tabIndex={0}
            style={{
              ...styles.star,
              color: star <= currentRating ? '#ffc107' : '#e4e5e9',
              transform: star <= currentRating ? 'scale(1.2)' : 'scale(1)',
              transition: 'color 0.3s, transform 0.2s',
            }}
            aria-label={`${star} star`}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Terima kasih sudah melakukan pembayaran!</h2>
      <p style={styles.subtitle}>Silakan berikan rating untuk barang ini:</p>
      <RatingStars currentRating={userRating} onRate={handleUserRate} />
      {userRating > 0 && (
        <p style={styles.thanks}>Kamu memberi rating: <strong>{userRating} bintang</strong></p>
      )}
      <hr style={styles.divider} />
      <p style={styles.average}>
        Rating rata-rata penitip: <strong>{averageRating} / 5</strong>
      </p>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: 400,
    margin: '40px auto',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    marginBottom: 20,
    color: '#555',
    fontSize: 16,
  },
  starContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 15,
  },
  star: {
    fontSize: 36,
    cursor: 'pointer',
    userSelect: 'none',
  },
  thanks: {
    fontSize: 16,
    color: '#4caf50',
    marginBottom: 15,
  },
  divider: {
    margin: '20px 0',
    border: 'none',
    borderTop: '1px solid #eee',
  },
  average: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
};

export default PaymentAndRating;
