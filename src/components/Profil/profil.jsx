import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  User, 
  Edit, 
  Star, 
  Package, 
  CreditCard, 
  MapPin,
  Settings,
  Shield,
  HelpCircle
} from 'lucide-react';

// Definisi color palette
const colors = {
  primary: '#937f6a',
  secondary: '#5a374b',
  tertiary: '#3a4550',
  accent: '#b4a95c'
};

// Custom CSS untuk styling tambahan
const customStyles = `
  .profile-header {
    background-color: ${colors.primary};
    color: white;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .profile-menu-item {
    transition: all 0.3s ease;
    border-radius: 10px;
    margin-bottom: 8px;
    padding: 12px 16px;
  }
  .profile-menu-item:hover {
    background-color: ${colors.primary}20;
    transform: scale(1.01);
  }
  .badge-custom {
    background-color: ${colors.secondary};
    color: white;
  }
  .card-stat {
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
  .modal-content {
    border-radius: 15px;
    overflow: hidden;
  }
`;


const Profil = () => {
  
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

  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  
  const [stats, setStats] = useState({
    totalPembelian: 0,
    pesananSelesai: 0,
    pesananDibatalkan: 0
  });


  const [activities, setActivities] = useState([]);

  const fetchProfile = async () => {
    try {
  
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
        }
      ]);
    } catch (error) {
      console.error('Gagal memuat profil', error);
    }
  };


  const startEditing = () => {
    setEditData({...profile});
    setIsEditing(true);
  };


  const saveProfile = async (e) => {
    e.preventDefault();
    try {
    
      setProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Gagal menyimpan profil', error);
    }
  };


  useEffect(() => {
    
    fetchProfile();
  }, []);

  return (
    <div className="container-fluid" style={{ backgroundColor: colors.primary + '10' }}>
      {}
      <style>{customStyles}</style>

      {}
      <div className="profile-header p-3 d-flex align-items-center">
        <div className="position-relative me-3">
          {profile.profilePicture ? (
            <img 
              src={profile.profilePicture} 
              alt="Foto Profil" 
              className="rounded-circle" 
              style={{ width: 80, height: 80, objectFit: 'cover' }}
            />
          ) : (
            <div 
              className="rounded-circle d-flex justify-content-center align-items-center" 
              style={{ 
                width: 80, 
                height: 80, 
                backgroundColor: colors.secondary, 
                color: 'white' 
              }}
            >
              <User size={40} />
            </div>
          )}
          <button 
            className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle"
            style={{ padding: '2px 6px' }}
            onClick={startEditing}
          >
            <Edit size={16} />
          </button>
        </div>
        <div>
          <h4 className="mb-1">{profile.name}</h4>
          <p className="mb-1">@{profile.username}</p>
          <div className="d-flex align-items-center">
            <Star size={16} className="me-1 text-warning" />
            <span>{profile.points} Poin - Level {profile.level}</span>
          </div>
        </div>
      </div>

     <div className="row p-3 g-3">
  {[
    {
      label: 'Total Pembelian',
      value: 'Rp ' + stats.totalPembelian.toLocaleString(),
      bg: colors.secondary
    },
    {
      label: 'Pesanan Selesai',
      value: stats.pesananSelesai,
      bg: colors.tertiary
    },
    {
      label: 'Pesanan Dibatalkan',
      value: stats.pesananDibatalkan,
      bg: colors.accent
    }
  ].map((stat, i) => (
    <div className="col-12 col-md-4" key={i}>
      <div 
        className="card text-center p-3 card-stat" 
        style={{ backgroundColor: stat.bg, color: 'white' }}
      >
        <h5 className="mb-2">{stat.value}</h5>
        <small>{stat.label}</small>
      </div>
    </div>
  ))}
</div>


      
      <div className="list-group p-3">
        {[
          
        ].map((item, index) => (
          <a 
            key={index} 
            href="#" 
            className="list-group-item list-group-item-action profile-menu-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <span className="me-3" style={{ color: colors.secondary }}>
                {item.icon}
              </span>
              {item.text}
            </div>
            {item.badge !== undefined && (
              <span className="badge badge-custom rounded-pill">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </div>

      {/* Modal Edit Profil */}
      {isEditing && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <form onSubmit={saveProfile} className="modal-content">
              <div 
                className="modal-header" 
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                <h5 className="modal-title">Edit Profil</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setIsEditing(false)}
                ></button>
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
              <div 
                className="modal-footer" 
                style={{ backgroundColor: colors.tertiary }}
              >
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsEditing(false)}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="btn btn-light"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;