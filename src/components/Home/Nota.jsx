import React, { useState, useEffect } from "react";

// Color palette
const colors = {
  primary: "#937f6a",
  secondary: "#5a374b",
  tertiary: "#3a4550",
  accent: "#b4a95c",
  lightBg: "#f9f9f9",
  success: "#198754",
  error: "#dc3545",
};

// Generate nomor transaksi unik
const generateTransactionNumber = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  return `TRX${y}${m}${d}${h}${min}${s}`;
};

const Nota = ({
  cartItems = [],
  userPoints = 0,
  pointsToRedeem = 0,
  onCompleteTransaction,
}) => {
  const [transactionNumber, setTransactionNumber] = useState("");
  const [products, setProducts] = useState([]);
  const [remainingPoints, setRemainingPoints] = useState(userPoints);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setTransactionNumber(generateTransactionNumber());
    // Sinkronisasi produk dari cartItems dengan status default available
    const prods = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      status: "available",
    }));
    setProducts(prods);
  }, [cartItems]);

  const completeTransaction = () => {
    const updatedPoints = remainingPoints - (pointsToRedeem || 0);
    setRemainingPoints(updatedPoints >= 0 ? updatedPoints : 0);

    const updatedProducts = products.map((prod) => {
      const inCart = cartItems.find((item) => item.id === prod.id);
      if (inCart) {
        return { ...prod, status: "sold out" };
      }
      return prod;
    });
    setProducts(updatedProducts);

    setIsCompleted(true);

    if (onCompleteTransaction) {
      onCompleteTransaction({
        transactionNumber,
        remainingPoints: updatedPoints,
        soldOutProducts: updatedProducts.filter((p) => p.status === "sold out"),
      });
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
          * {
            box-sizing: border-box;
          }
          body {
            font-family: 'Poppins', sans-serif;
            background-color: ${colors.lightBg};
          }
          ul {
            padding-left: 20px;
          }
          button:hover {
            opacity: 0.9;
          }
        `}
      </style>

      <h2 style={styles.heading}>Nota Transaksi</h2>

      <div style={styles.section}>
        <strong>Nomor Transaksi:</strong>{" "}
        <span style={styles.transactionNumber}>{transactionNumber}</span>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subHeading}>Daftar Barang</h3>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} style={styles.listItem}>
                <span style={{ fontWeight: 600 }}>{item.name}</span> &nbsp;|&nbsp; Qty:{" "}
                {item.quantity} &nbsp;|&nbsp; Harga:{" "}
                <span style={{ color: colors.primary, fontWeight: 600 }}>
                  Rp {item.price.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: colors.error }}>Keranjang kosong</p>
        )}
      </div>

      <div style={{ ...styles.section, ...styles.pointsContainer }}>
        <div>
          <strong>Poin Anda Saat Ini:</strong>{" "}
          <span style={styles.points}>{userPoints}</span>
        </div>
        <div>
          <strong>Poin yang Ditukarkan:</strong>{" "}
          <span style={styles.points}>{pointsToRedeem || 0}</span>
        </div>
        <div>
          <strong>Sisa Poin Setelah Transaksi:</strong>{" "}
          <span style={styles.points}>{remainingPoints}</span>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subHeading}>Status Produk</h3>
        <ul>
          {products.map((prod) => (
            <li key={prod.id} style={styles.listItem}>
              {prod.name} - Status:{" "}
              <span
                style={{
                  color: prod.status === "sold out" ? colors.error : colors.success,
                  fontWeight: "600",
                }}
              >
                {prod.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {!isCompleted ? (
        <button style={styles.button} onClick={completeTransaction}>
          Selesaikan Transaksi
        </button>
      ) : (
        <p style={styles.successMessage}>✅ Transaksi berhasil diselesaikan.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 700,
    margin: "30px auto",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 16,
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: colors.secondary,
    marginBottom: 25,
    fontWeight: 700,
  },
  transactionNumber: {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 18,
    backgroundColor: colors.lightBg,
    padding: "3px 8px",
    borderRadius: 6,
    letterSpacing: 2,
  },
  section: {
    marginBottom: 25,
  },
  subHeading: {
    borderBottom: `3px solid ${colors.accent}`,
    display: "inline-block",
    paddingBottom: 6,
    marginBottom: 12,
    color: colors.tertiary,
  },
  listItem: {
    marginBottom: 8,
    fontSize: 16,
  },
  pointsContainer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: colors.lightBg,
    padding: 15,
    borderRadius: 10,
  },
  points: {
    color: colors.primary,
    fontWeight: "700",
  },
  button: {
    width: "100%",
    padding: "15px 0",
    backgroundColor: colors.primary,
    color: "white",
    border: "none",
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 5px 15px rgba(147, 127, 106, 0.6)",
  },
  successMessage: {
    textAlign: "center",
    fontSize: 18,
    color: colors.success,
    fontWeight: "700",
  },
};

export default Nota;
