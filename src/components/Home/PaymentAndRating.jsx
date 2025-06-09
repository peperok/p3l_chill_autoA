import React, { useState, useEffect } from "react";

const purchasedItemsSample = [
  { id: 1, name: "Sepatu Nike Travis Scoot" },
  
];

const RatingStars = ({ currentRating, onRate }) => {
  return (
    <div style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onRate(star);
          }}
          role="button"
          tabIndex={0}
          style={{
            ...styles.star,
            color: star <= currentRating ? "#ffc107" : "#e4e5e9",
            transform: star <= currentRating ? "scale(1.2)" : "scale(1)",
            transition: "color 0.3s, transform 0.2s",
          }}
          aria-label={`${star} star`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

const PaymentAndRating = () => {
  const [purchasedItems, setPurchasedItems] = useState(purchasedItemsSample);
  const [allRatings, setAllRatings] = useState([]);
  const [userRatings, setUserRatings] = useState({}); // { productId: rating }

  // Update allRatings dan userRatings saat user memberikan rating
  const handleUserRate = (productId, star) => {
    setUserRatings((prev) => ({ ...prev, [productId]: star }));

    // Tambahkan atau update rating pada allRatings
    setAllRatings((prev) => {
      const existingIndex = prev.findIndex((r) => r.productId === productId);
      if (existingIndex >= 0) {
        // Update rating yang sudah ada
        const updated = [...prev];
        updated[existingIndex] = { productId, rating: star };
        return updated;
      } else {
        // Tambah rating baru
        return [...prev, { productId, rating: star }];
      }
    });
  };

  // Hitung rating rata-rata untuk barang tertentu
  const getAverageRating = (productId) => {
    const ratingsForProduct = allRatings.filter((r) => r.productId === productId);
    if (ratingsForProduct.length === 0) return 0;
    const avg = ratingsForProduct.reduce((sum, r) => sum + r.rating, 0) / ratingsForProduct.length;
    return avg.toFixed(1);
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Terima kasih sudah melakukan pembayaran!</h2>
      <p style={styles.subtitle}>Berikan rating untuk barang yang sudah dibeli:</p>

      {purchasedItems.map((item) => (
        <div key={item.id} style={styles.productItem}>
          <div style={{ fontWeight: "600", fontSize: 18 }}>{item.name}</div>

          <RatingStars
            currentRating={userRatings[item.id] || 0}
            onRate={(star) => handleUserRate(item.id, star)}
          />

          {userRatings[item.id] > 0 && (
            <p style={styles.thanks}>
              Kamu memberi rating: <strong>{userRatings[item.id]} bintang</strong>
            </p>
          )}

          <p style={styles.average}>
            Rating rata-rata: <strong>{getAverageRating(item.id)} / 5</strong>
          </p>

          <hr style={styles.divider} />
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 30,
    color: "#555",
    fontSize: 16,
    textAlign: "center",
  },
  productItem: {
    marginBottom: 25,
  },
  starContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginBottom: 10,
  },
  star: {
    fontSize: 36,
    cursor: "pointer",
    userSelect: "none",
  },
  thanks: {
    fontSize: 16,
    color: "#4caf50",
    marginBottom: 5,
    textAlign: "center",
  },
  divider: {
    margin: "20px 0",
    border: "none",
    borderTop: "1px solid #eee",
  },
  average: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
  },
};

export default PaymentAndRating;
