import React, { useState, useEffect } from "react";
import { User, Wallet, Gift, Clock, ChevronRight, Edit, CreditCard } from "lucide-react";

// Color palette
const colors = {
  primary: '#937f6a',
  secondary: '#5a374b',
  tertiary: '#3a4550',
  accent: '#b4a95c'
};

// Mock service layer - replace with API calls
const ProfileService = {
  async getProfile() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'PENITIP001',
          name: 'Budi Santoso',
          email: 'budi.santoso@example.com',
          phone: '+62 812-3456-7890',
          saldo: 750000,
          points: 1250,
          ratarata_rating: 4.2, // rata-rata rating awal
        });
      }, 500);
    });
  },

  async getTransactions(page = 1, limit = 10) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          total: 25,
          page: page,
          transactions: [
            {
              id: 'TRX001',
              date: '2024-05-10',
              title: 'Jaket Kulit Domba',
              status: 'Berhasil',
              amount: 250000,
              commission: 25000
            },
            {
              id: 'TRX002',
              date: '2024-05-05',
              title: 'Sepatu Sneakers',
              status: 'Berhasil',
              amount: 500000,
              commission: 50000
            },
            {
              id: 'TRX003',
              date: '2024-04-28',
              title: 'Tas Branded',
              status: 'Berhasil',
              amount: 1200000,
              commission: 120000
            }
          ]
        });
      }, 500);
    });
  },

  async withdrawSaldo(amount) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount > 0 && amount <= 750000) {
          resolve({
            success: true,
            newSaldo: 750000 - amount
          });
        } else {
          reject(new Error('Saldo tidak mencukupi'));
        }
      }, 1000);
    });
  },

  async topUpSaldo(amount) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount > 0) {
          resolve({
            success: true,
            newSaldo: 750000 + amount
          });
        } else {
          reject(new Error('Jumlah top-up harus lebih dari 0'));
        }
      }, 1000);
    });
  },

  async getBarangDititip() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'BRG001', name: 'Tas Kulit', durasi: 30 },
          { id: 'BRG002', name: 'Jaket Denim', durasi: 15 },
          { id: 'BRG003', name: 'Koper Besar', durasi: 45 }
        ]);
      }, 500);
    });
  },

  async perpanjangDurasiBarang(id, tambahanHari) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id, tambahanHari });
      }, 500);
    });
  }
};

const ProfilPenitip = () => {
  // State management
  const [profile, setProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [barangDititip, setBarangDititip] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals and interactions
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

  // RATING STATES
  // Store user ratings per barang { barangId: rating }
  const [userRatings, setUserRatings] = useState({});

  // Fetch profile, transactions, and barang dititip on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const profileData = await ProfileService.getProfile();
        const transactionsData = await ProfileService.getTransactions();
        const barangData = await ProfileService.getBarangDititip();

        setProfile(profileData);
        setTransactions(transactionsData.transactions);
        setBarangDititip(barangData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Withdrawal handler
  const handleWithdraw = async () => {
    try {
      const amount = parseInt(withdrawAmount);
      const result = await ProfileService.withdrawSaldo(amount);

      setProfile(prev => ({
        ...prev,
        saldo: result.newSaldo
      }));

      setIsWithdrawOpen(false);
      setWithdrawAmount('');
    } catch (err) {
      alert(err.message);
    }
  };

  // Top-Up handler
  const handleTopUp = async () => {
    try {
      const amount = parseInt(topUpAmount);
      const result = await ProfileService.topUpSaldo(amount);

      setProfile(prev => ({
        ...prev,
        saldo: result.newSaldo
      }));

      setIsTopUpOpen(false);
      setTopUpAmount('');
    } catch (err) {
      alert(err.message);
    }
  };

  // Handler perpanjang durasi barang
  const handlePerpanjang = async (id) => {
    const tambahan = prompt('Masukkan jumlah hari tambahan:');
    if (tambahan && !isNaN(tambahan)) {
      const result = await ProfileService.perpanjangDurasiBarang(id, parseInt(tambahan));
      if (result.success) {
        setBarangDititip(prev =>
          prev.map(b => b.id === id ? { ...b, durasi: b.durasi + parseInt(tambahan) } : b)
        );
      }
    }
  };

  // Handle rating barang oleh user
  const handleRateBarang = (barangId, star) => {
    setUserRatings(prev => ({
      ...prev,
      [barangId]: star,
    }));
    // TODO: Kirim rating ke backend jika ada
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="text-center">
          <div
            className="animate-spin w-16 h-16 border-4 rounded-full mx-auto mb-4"
            style={{
              borderColor: `${colors.secondary} transparent ${colors.secondary} transparent`
            }}
          />
          <p style={{ color: colors.tertiary }}>Memuat Profil...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen p-4"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>
            Kesalahan
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 rounded"
            style={{ backgroundColor: colors.tertiary, color: 'white' }}
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  // Komponen bintang rating kecil
  const RatingStars = ({ rating, onRate }) => {
    return (
      <div style={{ display: 'flex', cursor: onRate ? 'pointer' : 'default' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => onRate && onRate(star)}
            style={{
              fontSize: 20,
              color: star <= rating ? '#ffc107' : '#e4e5e9',
              marginRight: 4,
              userSelect: 'none',
            }}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: colors.primary }}>
      {/* Profile Header */}
      <div
        className="bg-white shadow-lg rounded-lg overflow-hidden mb-4"
        style={{ borderColor: colors.secondary }}
      >
        <div
          className="p-4 flex items-center justify-between text-white"
          style={{ backgroundColor: colors.secondary }}
        >
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <User size={32} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-sm">{profile.email}</p>
            </div>
          </div>
          <button onClick={() => setIsEditProfileOpen(true)} className="text-white">
            <Edit color="white" size={24} />
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center">
                <Wallet className="mr-2" style={{ color: colors.secondary }} />
                <div>
                  <p className="text-sm text-gray-600">Saldo</p>
                  <p className="font-bold">Rp {profile.saldo.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <Gift className="mr-2" style={{ color: colors.accent }} />
                <div>
                  <p className="text-sm text-gray-600">Poin Reward</p>
                  <p className="font-bold">{profile.points} Poin</p>
                </div>
              </div>
            </div>
          </div>
          {/* Rata-rata rating penitip */}
          <div className="mt-4 flex items-center">
            <span className="mr-2 font-semibold">Rata-rata Rating Penitip:</span>
            <RatingStars rating={profile.ratarata_rating ?? 0} />
            <span className="ml-2 text-gray-600">({profile.ratarata_rating?.toFixed(1) ?? '0.0'} / 5)</span>
          </div>

          {/* Withdrawal & Top-Up Buttons */}
          <button
            className="w-full mt-4 py-2 rounded"
            style={{ backgroundColor: colors.tertiary, color: 'white' }}
            onClick={() => setIsWithdrawOpen(true)}
          >
            <div className="flex items-center justify-center">
              <CreditCard className="mr-2" /> Tarik Saldo
            </div>
          </button>

          <button
            className="w-full mt-2 py-2 rounded"
            style={{ backgroundColor: colors.accent, color: 'white' }}
            onClick={() => setIsTopUpOpen(true)}
          >
            <Wallet className="mr-2" /> Top-Up Saldo
          </button>
        </div>
      </div>

      {/* Riwayat Transaksi */}
      <div
        className="bg-white rounded-lg shadow-md"
        style={{ borderColor: colors.secondary }}
      >
        <div
          className="p-4 flex justify-between items-center border-b"
          style={{ borderColor: colors.primary }}
        >
          <h3 className="text-lg font-bold flex items-center" style={{ color: colors.tertiary }}>
            <Clock className="mr-2" /> Riwayat Transaksi
          </h3>
          <button className="text-sm flex items-center" style={{ color: colors.tertiary }}>
            Lihat Semua <ChevronRight className="ml-2" />
          </button>
        </div>

        <div className="p-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-3 mb-2 rounded-lg border flex justify-between items-center"
              style={{ backgroundColor: colors.primary + "20", borderColor: colors.secondary }}
            >
              <div>
                <p className="font-semibold">{transaction.title}</p>
                <p className="text-sm text-gray-600">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold" style={{ color: colors.secondary }}>
                  Rp {transaction.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Komisi: Rp {transaction.commission.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daftar Barang Dititip */}
      <div
        className="bg-white rounded-lg shadow-md mt-6"
        style={{ borderColor: colors.secondary }}
      >
        <div
          className="p-4 border-b"
          style={{ borderColor: colors.primary }}
        >
          <h3 className="text-lg font-bold" style={{ color: colors.tertiary }}>
            Daftar Barang Dititip
          </h3>
          <input
            type="text"
            placeholder="Cari barang..."
            className="w-full mt-2 p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="p-4 space-y-2">
          {barangDititip
            .filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(barang => (
              <div
                key={barang.id}
                className="p-3 border rounded flex justify-between items-center"
                style={{ backgroundColor: colors.primary + "10", borderColor: colors.secondary }}
              >
                <div>
                  <p className="font-bold">{barang.name}</p>
                  <p className="text-sm text-gray-600">Durasi: {barang.durasi} hari</p>
                </div>

                {/* Rating untuk tiap barang */}
                <div className="flex items-center">
                  <RatingStars
                    rating={userRatings[barang.id] ?? 0}
                    onRate={(star) => handleRateBarang(barang.id, star)}
                  />
                </div>

                <button
                  className="text-sm py-1 px-3 rounded ml-4"
                  style={{ backgroundColor: colors.accent, color: "white" }}
                  onClick={() => handlePerpanjang(barang.id)}
                >
                  Perpanjang
                </button>
              </div>
            ))}
          {barangDititip.length === 0 && (
            <p className="text-center text-gray-500">Tidak ada barang yang dititipkan</p>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsEditProfileOpen(false)}
        >
          <div className="bg-white p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>
              Edit Profil
            </h2>
            <p>Fungsionalitas edit profil akan ditambahkan</p>
            <button
              className="w-full mt-4 py-2 rounded"
              style={{ backgroundColor: colors.tertiary, color: "white" }}
              onClick={() => setIsEditProfileOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsWithdrawOpen(false)}
        >
          <div className="bg-white p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>
              Tarik Saldo
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="mr-2">Rp</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Masukkan jumlah saldo"
                  max={profile.saldo}
                />
              </div>
              <div className="flex justify-between">
                <span>Saldo Tersedia:</span>
                <span className="font-bold">Rp {profile.saldo.toLocaleString()}</span>
              </div>
              <button
                className="w-full py-2 rounded"
                style={{ backgroundColor: colors.tertiary, color: "white" }}
                disabled={!withdrawAmount || parseInt(withdrawAmount) > profile.saldo}
                onClick={handleWithdraw}
              >
                <div className="flex items-center justify-center">
                  <CreditCard className="mr-2" /> Tarik
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top-Up Modal */}
      {isTopUpOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsTopUpOpen(false)}
        >
          <div className="bg-white p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4" style={{ color: colors.secondary }}>
              Top-Up Saldo
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="mr-2">Rp</span>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Masukkan jumlah top-up"
                  min={1}
                />
              </div>
              <button
                className="w-full py-2 rounded"
                style={{ backgroundColor: colors.accent, color: "white" }}
                disabled={!topUpAmount || parseInt(topUpAmount) <= 0}
                onClick={handleTopUp}
              >
                Top-Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilPenitip;
