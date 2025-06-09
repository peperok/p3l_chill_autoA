import React, { useState } from 'react';
import { format, isToday, parseISO } from 'date-fns';

const colors = {
  primary: '#937f6a',
  secondary: '#5a374b',
  tertiary: '#3a4550',
  accent: '#b4a95c',
  white: '#ffffff',
  lightGray: '#f5f5f5',
};



const ExpiredTransactions = () => {
    
   
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      item: 'Koper Merah',
      expiredAt: '2025-06-03',
      status: 'Belum Diambil',
    },
    {
      id: 2,
      item: 'Laptop Asus',
      expiredAt: '2025-06-03',
      status: 'Sudah Diperpanjang',
    },
    {
      id: 3,
      item: 'Tas Gunung',
      expiredAt: '2025-06-03',
      status: 'Belum Diambil',
    },
  ]);

  const handleExtend = (id) => {
    const updated = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, status: 'Sudah Diperpanjang' }
        : transaction
    );
    setTransactions(updated);
  };

  const todayExpired = transactions.filter((transaction) =>
    isToday(parseISO(transaction.expiredAt))
  );

  

  return (

    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: colors.tertiary,
      minHeight: '100vh',
      padding: '40px',
      color: colors.white,
    }}>
      <h2 style={{
        color: colors.accent,
        borderBottom: `2px solid ${colors.accent}`,
        paddingBottom: '10px',
        marginBottom: '30px',
      }}>
        Transaksi Habis Masa Penitipan Hari Ini
      </h2>

      {todayExpired.length === 0 ? (
        <p>Tidak ada transaksi yang habis hari ini.</p>
      ) : (
        <div style={{
          backgroundColor: colors.white,
          color: colors.tertiary,
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead style={{ backgroundColor: colors.primary, color: colors.white }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Barang</th>
                <th style={thStyle}>Tanggal Habis</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {todayExpired.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? colors.lightGray : '#e0ddd5',
                  }}
                >
                  <td style={tdStyle}>{transaction.id}</td>
                  <td style={tdStyle}>{transaction.item}</td>
                  <td style={tdStyle}>{format(parseISO(transaction.expiredAt), 'dd-MM-yyyy')}</td>
                  <td style={tdStyle}>{transaction.status}</td>
                  <td style={tdStyle}>
                    {transaction.status === 'Belum Diambil' ? (
                      <button
                        style={buttonStyle}
                        onClick={() => handleExtend(transaction.id)}
                      >
                        Perpanjang
                      </button>
                    ) : (
                      <span style={{ color: colors.accent, fontWeight: 'bold' }}>✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Styling for table headers and cells
const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '12px',
  textAlign: 'left',
};

// Button styling
const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#b4a95c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default ExpiredTransactions;
