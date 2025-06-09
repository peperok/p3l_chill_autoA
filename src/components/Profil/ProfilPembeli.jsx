import React, { useState, useEffect } from 'react';
import { 
  User, 
  Edit, 
  Star, 
  Package, 
  CreditCard, 
  MapPin,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

// Definisi color palette
const colors = {
  primary: '#937f6a',
  secondary: '#5a374b',
  tertiary: '#3a4550',
  accent: '#b4a95c',
  light: '#f8f5f2',
  darkText: '#2d2d2d'
};

// Custom CSS untuk styling tambahan
const customStyles = `
  body {
    background-color: ${colors.light};
    font-family: 'Inter', sans-serif;
  }
  .profile-header {
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    color: white;
    border-radius: 0 0 30px 30px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    padding: 2rem 1.5rem;
  }
  .profile-picture-container {
    position: relative;
    margin-right: 1.5rem;
  }
  .profile-picture {
    width: 90px;
    height: 90px;
    border: 3px solid white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  .profile-picture:hover {
    transform: scale(1.05);
  }
  .edit-button {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: white;
    color: ${colors.secondary};
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
  }
  .edit-button:hover {
    transform: scale(1.1);
    background-color: ${colors.accent};
    color: white;
  }
  .profile-info .level-badge {
    background-color: rgba(255,255,255,0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    display: inline-flex;
    align-items: center;
    margin-top: 6px;
  }
  .stats-container {
    margin-top: -20px;
    padding: 0 1rem;
  }
  .card-stat {
    border-radius: 16px;
    padding: 1.2rem 1rem;
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
    text-align: center;
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
  }
  .card-stat:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.12);
  }
  .card-stat .stat-value {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .card-stat .stat-label {
    font-size: 0.85rem;
    opacity: 0.9;
  }
  .menu-container {
    padding: 1.5rem 1rem;
  }
  .profile-menu-item {
    padding: 1rem 1.2rem;
    margin-bottom: 10px;
    border-radius: 12px;
    background-color: white;
    border: none;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${colors.darkText};
    text-decoration: none;
  }
  .profile-menu-item:hover {
    background-color: ${colors.primary}10;
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  .menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-right: 15px;
    background-color: ${colors.primary}15;
    color: ${colors.primary};
  }
  .menu-text {
    font-weight: 500;
    flex: 1;
  }
  .badge-custom {
    background-color: ${colors.secondary};
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  .modal-content {
    width: 90%;
    max-width: 500px;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    animation: slideUp 0.3s ease;
  }
  .modal-header {
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    color: white;
    padding: 1.2rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-body {
    padding: 1.5rem;
  }
  .modal-footer {
    padding: 1rem 1.5rem;
    background-color: ${colors.light};
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .form-control {
    border-radius: 10px;
    padding: 0.6rem 1rem;
    border: 1px solid #ddd;
    transition: all 0.2s ease;
  }
  .form-control:focus {
    box-shadow: 0 0 0 3px ${colors.primary}30;
    border-color: ${colors.primary};
  }
  .btn-cancel {
    background-color: #e0e0e0;
    color: #666;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1.2rem;
    transition: all 0.2s ease;
  }
  .btn-cancel:hover {
    background-color: #d0d0d0;
  }
  .btn-save {
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1.2rem;
    transition: all 0.2s ease;
  }
  .btn-save:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  .activity-section {
    padding: 0 1rem 2rem 1rem;
  }
  .activity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }
  .activity-card {
    background-color: white;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: transform 0.2s ease;
  }
  .activity-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  .activity-icon {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
  }
  .purchase-icon {
    background-color: ${colors.accent}20;
    color: ${colors.accent};
  }
  .reward-icon {
    background-color: ${colors.secondary}20;
    color: ${colors.secondary};
  }
  .activity-info {
    flex: 1;
  }
  .activity-date {
    font-size: 0.75rem;
    color: #888;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const ProfilPembeli = () => {
  // State untuk data profil
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    profilePicture: null,
    points: 0,
    level: '',
    joinDate: ''
  });

  // State untuk edit profil
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // State untuk statistik
  const [stats, setStats] = useState({
    totalPembelian: 0,
    pesananSelesai: 0,
    pesananDibatalkan: 0
  });

  // State untuk riwayat aktivitas
  const [activities, setActivities] = useState([]);

  // Fungsi untuk memuat data profil
  const fetchProfile = async () => {
    try {
      // TODO: Ganti dengan pemanggilan API sebenarnya
      setProfile({
        name: 'Wira Utama',
        username: 'wira_utama',
        email: 'yudhikawirautam@gmail.com',
        phone: '+62 811-2345-6789',
        profilePicture: null,
        points: 750,
        level: 'Silver',
        joinDate: '15 Januari 2023'
      });

      setStats({
        totalPembelian: 5250000,
        pesananSelesai: 15,
        pesananDibatalkan: 2
      });

      setActivities([
        { 
          id: 1, 
          type: 'purchase', 
          description: 'Membeli Sepatu Olahraga', 
          date: '12 Mei 2024' 
        },
        { 
          id: 2, 
          type: 'reward', 
          description: 'Mendapatkan 50 Poin', 
          date: '10 Mei 2024' 
        },
        { 
          id: 3, 
          type: 'purchase', 
          description: 'Membeli Tas Ransel Premium', 
          date: '5 Mei 2024' 
        }
      ]);
    } catch (error) {
      console.error('Gagal memuat profil', error);
    }
  };

  // Fungsi untuk memulai edit profil
  const startEditing = () => {
    setEditData({...profile});
    setIsEditing(true);
  };

  // Fungsi untuk menyimpan perubahan profil
  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      // TODO: Kirim data update ke backend
      setProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Gagal menyimpan profil', error);
    }
  };

  // Efek untuk memuat data saat komponen dipasang
  useEffect(() => {
    fetchProfile();
  }, []);

  // Rendering badge level berdasarkan level profil
  const renderLevelBadge = () => {
    let badgeColor = colors.accent;
    
    if (profile.level === 'Gold') {
      badgeColor = '#FFD700';
    } else if (profile.level === 'Silver') {
      badgeColor = '#C0C0C0';
    } else if (profile.level === 'Bronze') {
      badgeColor = '#CD7F32';
    }
    
    return (
      <span className="level-badge">
        <Star size={16} className="me-1" style={{ color: badgeColor }} />
        {profile.points} Poin - Level {profile.level}
      </span>
    );
  };

  return (
    <div className="profile-container">
      {/* Tambahkan custom styles */}
      <style>{customStyles}</style>

      {/* Header Profil */}
      <div className="profile-header">
        <div className="d-flex">
          <div className="profile-picture-container">
            {profile.profilePicture ? (
              <img 
                src={profile.profilePicture} 
                alt="Foto Profil" 
                className="rounded-circle profile-picture"
              />
            ) : (
              <div className="rounded-circle d-flex justify-content-center align-items-center profile-picture"
                style={{ backgroundColor: colors.tertiary }}
              >
                <User size={40} />
              </div>
            )}
            <button 
              className="edit-button"
              onClick={startEditing}
            >
              <Edit size={16} />
            </button>
          </div>
          <div className="profile-info">
            <h3 className="mb-1">{profile.name}</h3>
            <p className="mb-1 text-white-50">@{profile.username}</p>
            {renderLevelBadge()}
          </div>
        </div>
        <div className="mt-3 d-flex align-items-center">
          <div className="me-4">
            <small className="text-white-50">Email</small>
            <p className="mb-0">{profile.email}</p>
          </div>
          <div>
            <small className="text-white-50">Telepon</small>
            <p className="mb-0">{profile.phone}</p>
          </div>
        </div>
      </div>

      {/* Statistik Profil */}
      <div className="stats-container">
        <div className="row g-3">
          {[
            {
              label: 'Total Pembelian',
              value: 'Rp ' + stats.totalPembelian.toLocaleString(),
              bg: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              textColor: 'white'
            },
            {
              label: 'Pesanan Selesai',
              value: stats.pesananSelesai,
              bg: 'white',
              textColor: colors.darkText,
              icon: <Package size={24} className="mb-2" style={{ color: colors.secondary }} />
            },
            {
              label: 'Pesanan Dibatalkan',
              value: stats.pesananDibatalkan,
              bg: 'white',
              textColor: colors.darkText,
              icon: <MapPin size={24} className="mb-2" style={{ color: colors.accent }} />
            }
          ].map((stat, i) => (
            <div className="col-12 col-md-4" key={i}>
              <div 
                className="card-stat d-flex flex-column align-items-center justify-content-center" 
                style={{ 
                  background: stat.bg,
                  color: stat.textColor
                }}
              >
                {stat.icon}
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Profil */}
      <div className="menu-container">
        {[
          { 
            icon: <Package size={20} />, 
            text: 'Pesanan Saya', 
            badge: stats.pesananSelesai 
          },
          { 
            icon: <Star size={20} />, 
            text: 'Reward & Poin', 
            badge: profile.points 
          },
          { 
            icon: <CreditCard size={20} />, 
            text: 'Metode Pembayaran' 
          },
          { 
            icon: <MapPin size={20} />, 
            text: 'Alamat Pengiriman' 
          },
          { 
            icon: <Settings size={20} />, 
            text: 'Pengaturan Akun' 
          },
          { 
            icon: <Shield size={20} />, 
            text: 'Keamanan Akun' 
          },
          { 
            icon: <HelpCircle size={20} />, 
            text: 'Pusat Bantuan' 
          },
          { 
            icon: <LogOut size={20} />, 
            text: 'Keluar', 
            textColor: '#e74c3c' 
          }
        ].map((item, index) => (
          <a 
            key={index} 
            href="#" 
            className="profile-menu-item"
          >
            <div className="d-flex align-items-center">
              <span className="menu-icon">
                {item.icon}
              </span>
              <span className="menu-text" style={item.textColor ? { color: item.textColor } : {}}>
                {item.text}
              </span>
            </div>
            <div className="d-flex align-items-center">
              {item.badge !== undefined && (
                <span className="badge-custom me-2">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={18} className="text-muted" />
            </div>
          </a>
        ))}
      </div>

      {/* Riwayat Aktivitas */}
      <div className="activity-section">
        <div className="activity-header">
          <h5>Aktivitas Terakhir</h5>
          <a href="#" className="text-decoration-none" style={{ color: colors.secondary }}>
            Lihat Semua
          </a>
        </div>
        
        <div className="activity-list">
          {activities.map((activity) => (
            <div className="activity-card" key={activity.id}>
              <div className={`activity-icon ${activity.type === 'purchase' ? 'purchase-icon' : 'reward-icon'}`}>
                {activity.type === 'purchase' ? <Package size={20} /> : <Star size={20} />}
              </div>
              <div className="activity-info">
                <div className="fw-medium">{activity.description}</div>
                <div className="activity-date">{activity.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Edit Profil */}
      {isEditing && (
        <div className="modal-overlay">
          <form onSubmit={saveProfile} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title m-0">Edit Profil</h5>
              <button 
                type="button" 
                className="btn p-0 text-white" 
                onClick={() => setIsEditing(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({
                    ...prev, 
                    name: e.target.value
                  }))}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editData.username}
                  onChange={(e) => setEditData(prev => ({
                    ...prev, 
                    username: e.target.value
                  }))}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={editData.email}
                  onChange={(e) => setEditData(prev => ({
                    ...prev, 
                    email: e.target.value
                  }))}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nomor Telepon</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  value={editData.phone}
                  onChange={(e) => setEditData(prev => ({
                    ...prev, 
                    phone: e.target.value
                  }))}
                  required 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-cancel" 
                onClick={() => setIsEditing(false)}
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="btn btn-save"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilPembeli;