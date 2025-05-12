import React, { useState, useEffect } from "react";
import { User, Wallet, Gift, Clock, ChevronRight, Edit, CreditCard } from "lucide-react";

// Color palette
const colors = {
  primary: '#937f6a',
  secondary: '#5a374b',
  tertiary: '#3a4550',
  accent: '#b4a95c'
};

// Mock service layer - would be replaced with actual API calls
const ProfileService = {
  async getProfile() {
    // Simulating an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'PENITIP001',
          name: 'Budi Santoso',
          email: 'budi.santoso@example.com',
          phone: '+62 812-3456-7890',
          saldo: 750000,
          points: 1250
        });
      }, 500);
    });
  },

  async getTransactions(page = 1, limit = 10) {
    // Simulating paginated transactions API
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
    // Simulating withdrawal API
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
  }
};

const ProfilPenitip = () => {
  // State management
  const [profile, setProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modals and interactions
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Fetch profile and transactions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const profileData = await ProfileService.getProfile();
        const transactionsData = await ProfileService.getTransactions();
        
        setProfile(profileData);
        setTransactions(transactionsData.transactions);
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
      
      // Update profile saldo
      setProfile(prev => ({
        ...prev,
        saldo: result.newSaldo
      }));
      
      // Close withdrawal dialog
      setIsWithdrawOpen(false);
      setWithdrawAmount('');
    } catch (err) {
      alert(err.message);
    }
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
            style={{ 
              backgroundColor: colors.tertiary,
              color: 'white'
            }}
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-4" 
      style={{ backgroundColor: colors.primary }}
    >
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
            <div 
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4"
            >
              <User size={32} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-sm">{profile.email}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditProfileOpen(true)}
            className="text-white"
          >
            <Edit color="white" size={24} />
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center">
                <Wallet 
                  className="mr-2" 
                  style={{ color: colors.secondary }}
                />
                <div>
                  <p className="text-sm text-gray-600">Saldo</p>
                  <p className="font-bold">
                    Rp {profile.saldo.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <Gift 
                  className="mr-2" 
                  style={{ color: colors.accent }}
                />
                <div>
                  <p className="text-sm text-gray-600">Poin Reward</p>
                  <p className="font-bold">
                    {profile.points} Poin
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Withdrawal Button */}
          <button 
            className="w-full mt-4 py-2 rounded"
            style={{ 
              backgroundColor: colors.tertiary,
              color: 'white'
            }}
            onClick={() => setIsWithdrawOpen(true)}
          >
            <div className="flex items-center justify-center">
              <CreditCard className="mr-2" /> Tarik Saldo
            </div>
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
          <h3 
            className="text-lg font-bold flex items-center"
            style={{ color: colors.tertiary }}
          >
            <Clock className="mr-2" /> Riwayat Transaksi
          </h3>
          <button 
            className="text-sm flex items-center"
            style={{ color: colors.tertiary }}
          >
            Lihat Semua <ChevronRight className="ml-2" />
          </button>
        </div>

        <div className="p-4">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="p-3 mb-2 rounded-lg border flex justify-between items-center"
              style={{ 
                backgroundColor: colors.primary + '20', 
                borderColor: colors.secondary 
              }}
            >
              <div>
                <p className="font-semibold">{transaction.title}</p>
                <p className="text-sm text-gray-600">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p 
                  className="font-bold"
                  style={{ color: colors.secondary }}
                >
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

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsEditProfileOpen(false)}
        >
          <div 
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: colors.secondary }}
            >
              Edit Profil
            </h2>
            <p>Fungsionalitas edit profil akan ditambahkan</p>
            <button 
              className="w-full mt-4 py-2 rounded"
              style={{ 
                backgroundColor: colors.tertiary,
                color: 'white'
              }}
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
          <div 
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: colors.secondary }}
            >
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
                <span className="font-bold">
                  Rp {profile.saldo.toLocaleString()}
                </span>
              </div>
              <button 
                className="w-full py-2 rounded"
                style={{ 
                  backgroundColor: colors.tertiary,
                  color: 'white'
                }}
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
    </div>
  );
};

export default ProfilPenitip;