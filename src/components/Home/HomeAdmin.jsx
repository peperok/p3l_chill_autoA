// src/components/Home/HomeAdmin.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

const navItems = [
  "Dashboard",
  "Barang",
  "Merchandise",
  "Data Pegawai",
  "Data Pembeli",
  "Data Penitip",
  "Data Organisasi",
  "Request Donasi",
  "Profile",
  "Register Pembeli",
];

const PlaceholderPage = ({ title }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(Math.floor(Math.random() * 40) + 60), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <div className="floating-card">
              <div className="glass-card p-5 rounded-4 position-relative overflow-hidden">
                {/* Animated background particles */}
                <div className="particles">
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                  <div className="particle particle-4"></div>
                  <div className="particle particle-5"></div>
                </div>
                
                <div className="position-relative z-index-2">
                  <div className="icon-container mb-4">
                    <div className="rotating-border">
                      <div className="icon-wrapper">
                        <i className="fas fa-rocket fa-2x text-white"></i>
                      </div>
                    </div>
                  </div>
                  
                  <h1 className="display-5 fw-bold text-white mb-3 animate-title">
                    {title}
                  </h1>
                  
                  <p className="lead text-white-50 mb-4 animate-subtitle">
                    Modul {title} sedang dalam pengembangan dengan teknologi terdepan
                  </p>
                  
                  <div className="progress-container mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-white-75 fw-medium">Progress Pengembangan</span>
                      <span className="badge bg-success fs-6">{progress}%</span>
                    </div>
                    <div className="custom-progress">
                      <div 
                        className="custom-progress-bar" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-4">
                      <div className="stat-card">
                        <i className="fas fa-code text-primary mb-2"></i>
                        <div className="fw-bold">Frontend</div>
                        <small className="text-white-50">Ready</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-card">
                        <i className="fas fa-database text-info mb-2"></i>
                        <div className="fw-bold">Database</div>
                        <small className="text-white-50">Setup</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-card">
                        <i className="fas fa-cogs text-warning mb-2"></i>
                        <div className="fw-bold">API</div>
                        <small className="text-white-50">Testing</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeAdmin = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getIcon = (item) => {
    const icons = {
      "Dashboard": "fas fa-chart-line",
      "Barang": "fas fa-cube",
      "Merchandise": "fas fa-shopping-bag",
      "Data Pegawai": "fas fa-users-cog",
      "Data Pembeli": "fas fa-user-friends",
      "Data Penitip": "fas fa-handshake",
      "Data Organisasi": "fas fa-building",
      "Request Donasi": "fas fa-heart",
      "Profile": "fas fa-user-circle",
      "Register Pembeli": "fas fa-user-plus",
    };
    return icons[item] || "fas fa-circle";
  };

  const getNavColor = (index) => {
    const colors = [
      'nav-primary', 'nav-success', 'nav-info', 'nav-warning', 'nav-danger',
      'nav-purple', 'nav-pink', 'nav-cyan', 'nav-orange', 'nav-teal'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-content">
          {/* Logo Section */}
          <div className="logo-section">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="logo-container">
              <div className="logo-icon">
                <i className="fas fa-leaf"></i>
              </div>
              {!sidebarCollapsed && (
                <div className="logo-text">
                  <h4 className="mb-0">ReuseMart</h4>
                  <small>Admin Panel</small>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="nav-section">
            {navItems.map((item, index) => (
              <NavLink
                key={item}
                to={`/admin/${item.replace(/ /g, "").toLowerCase()}`}
                className={({ isActive }) =>
                  `nav-item ${getNavColor(index)} ${isActive ? 'active' : ''}`
                }
              >
                <div className="nav-icon">
                  <i className={getIcon(item)}></i>
                </div>
                {!sidebarCollapsed && (
                  <span className="nav-text">{item}</span>
                )}
                <div className="nav-indicator"></div>
              </NavLink>
            ))}
          </nav>

          {/* Logout Section */}
          <div className="logout-section">
            <NavLink to="/login" className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              {!sidebarCollapsed && <span>Logout</span>}
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="main-header">
          <div className="header-left">
            <h2 className="page-title">Welcome back, Admin! 👋</h2>
            <p className="page-subtitle">
              {currentTime.toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {currentTime.toLocaleTimeString('id-ID')}
            </p>
          </div>
          <div className="header-right">
            <div className="header-stats">
              <div className="stat-item">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">3</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-envelope"></i>
                <span className="notification-badge">7</span>
              </div>
              <div className="profile-avatar">
                <img src="https://via.placeholder.com/40" alt="Admin" className="rounded-circle" />
                <div className="status-indicator"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          <Routes>
            {navItems.map((item) => (
              <Route
                key={item}
                path={item.replace(/ /g, "").toLowerCase()}
                element={<PlaceholderPage title={item} />}
              />
            ))}
          </Routes>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .admin-dashboard {
          font-family: 'Poppins', sans-serif;
          height: 100vh;
          display: flex;
          background: linear-gradient(135deg, #937f6a 0%, #5a374b 100%);
          overflow: hidden;
        }
        
        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1000;
        }
        
        .sidebar.collapsed {
          width: 80px;
        }
        
        .sidebar-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 0;
        }
        
        .logo-section {
          padding: 0 1.5rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 2rem;
          position: relative;
        }
        
        .sidebar-toggle {
          position: absolute;
          top: -0.5rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .logo-icon {
          width: 45px;
          height: 45px;
          background: linear-gradient(45deg, #ff6b6b, #ffd93d);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .logo-text {
          color: white;
          transition: opacity 0.3s ease;
        }
        
        .logo-text h4 {
          font-weight: 700;
          margin: 0;
        }
        
        .logo-text small {
          opacity: 0.7;
          font-size: 0.75rem;
        }
        
        .nav-section {
          flex: 1;
          padding: 0 1rem;
          overflow-y: auto;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 12px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .nav-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }
        
        .nav-item.active {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: linear-gradient(45deg, #ff6b6b, #ffd93d);
          border-radius: 0 4px 4px 0;
        }
        
        .nav-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          font-size: 1.1rem;
        }
        
        .nav-text {
          font-weight: 500;
          transition: opacity 0.3s ease;
        }
        
        .nav-indicator {
          margin-left: auto;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .nav-item.active .nav-indicator {
          opacity: 1;
        }
        
        .logout-section {
          padding: 2rem 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logout-btn {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 107, 107, 0.1);
          border: 1px solid rgba(255, 107, 107, 0.2);
          transition: all 0.3s ease;
          gap: 1rem;
          font-weight: 500;
        }
        
        .logout-btn:hover {
          background: rgba(255, 107, 107, 0.2);
          color: white;
          transform: translateY(-2px);
        }
        
        /* Main Content Styles */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .main-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        
        .page-title {
          font-weight: 700;
          color: #2d3748;
          margin: 0;
          font-size: 1.8rem;
        }
        
        .page-subtitle {
          color: #718096;
          margin: 0.5rem 0 0;
          font-weight: 400;
        }
        
        .header-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .stat-item {
          position: relative;
          padding: 0.75rem;
          background: rgba(103, 126, 234, 0.1);
          border-radius: 12px;
          color: #937f6a;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .stat-item:hover {
          background: rgba(103, 126, 234, 0.2);
          transform: translateY(-2px);
        }
        
        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
        }
        
        .profile-avatar {
          position: relative;
        }
        
        .status-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          background: #937f6a;
          border: 2px solid white;
          border-radius: 50%;
        }
        
        .content-area {
          flex: 1;
          overflow: auto;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
        }
        
        /* Placeholder Page Styles */
        .floating-card {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: particle-float 4s ease-in-out infinite;
        }
        
        .particle-1 { width: 60px; height: 60px; top: 10%; left: 10%; animation-delay: 0s; }
        .particle-2 { width: 40px; height: 40px; top: 20%; right: 15%; animation-delay: 1s; }
        .particle-3 { width: 80px; height: 80px; bottom: 20%; left: 20%; animation-delay: 2s; }
        .particle-4 { width: 30px; height: 30px; bottom: 30%; right: 25%; animation-delay: 3s; }
        .particle-5 { width: 50px; height: 50px; top: 60%; left: 60%; animation-delay: 1.5s; }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
        }
        
        .icon-container {
          position: relative;
          display: inline-block;
        }
        
        .rotating-border {
          width: 120px;
          height: 120px;
          border: 3px solid transparent;
          border-radius: 50%;
          background: linear-gradient(45deg, #937f6a, #937f6a, #937f6a, #937f6a) border-box;
          animation: rotate 3s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        
        .icon-wrapper {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-title {
          animation: slideInDown 1s ease-out;
        }
        
        .animate-subtitle {
          animation: slideInUp 1s ease-out 0.2s both;
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .custom-progress {
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
        
        .custom-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #937f6a, #937f6a);
          border-radius: 20px;
          transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .custom-progress-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .stat-card {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
          color: white;
        }
        
        .stat-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-5px);
        }
        
        .z-index-2 {
          z-index: 2;
        }
        
        .text-white-50 {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        
        .text-white-75 {
          color: rgba(255, 255, 255, 0.75) !important;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .sidebar {
            width: 80px;
          }
          
          .sidebar.collapsed {
            width: 60px;
          }
          
          .main-header {
            padding: 1rem;
          }
          
          .content-area {
            padding: 1rem;
          }
          
          .page-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeAdmin;