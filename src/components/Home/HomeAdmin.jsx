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
  "Profile",
  "Register Pembeli",
  "Komisi",
];

const PlaceholderPage = ({ title }) => (
  <div className="text-center p-5">
    <h2 style={{ color: "#5a374b", fontWeight: "600" }}>{title}</h2>
    <p style={{ color: "#937f6a" }}>Modul {title} sedang dikembangkan.</p>
  </div>
);

const HomeAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Poppins, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: collapsed ? "80px" : "250px",
          backgroundColor: "#5a374b",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          {!collapsed && <h4 style={{ margin: 0 }}>ReuseMart</h4>}
          <button
            className="btn btn-sm btn-light"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item}
            to={`/admin/${item.replace(/ /g, "").toLowerCase()}`}
            className={({ isActive }) =>
              `d-flex align-items-center mb-2 px-3 py-2 rounded text-decoration-none ${
                isActive ? "bg-light text-dark" : "text-white"
              }`
            }
            style={{ fontWeight: 500, fontSize: "0.95rem" }}
          >
            <i className="fas fa-circle me-2"></i>
            {!collapsed && <span>{item}</span>}
          </NavLink>
        ))}

        <NavLink to="/login" className="btn btn-warning text-dark mt-auto">
          <i className="fas fa-sign-out-alt me-2"></i>
          {!collapsed && "Logout"}
        </NavLink>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, backgroundColor: "#f8f9fa", overflowY: "auto" }}>
        {/* Header */}
        <div
          className="px-4 py-3 d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div>
            <h5 className="mb-1" style={{ color: "#5a374b", fontWeight: 600 }}>
              Selamat datang, Admin! 👋
            </h5>
            <small style={{ color: "#937f6a" }}>
              {currentTime.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              • {currentTime.toLocaleTimeString("id-ID")}
            </small>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <i className="fas fa-bell fs-5 text-secondary"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </div>
            <div className="position-relative">
              <i className="fas fa-envelope fs-5 text-secondary"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                7
              </span>
            </div>
            <img
              src="https://via.placeholder.com/40"
              alt="Admin"
              className="rounded-circle"
              style={{ border: "2px solid #937f6a" }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
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

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }

        .nav-link:hover {
          background-color: #6e4e5d !important;
          color: white !important;
        }

        .nav-link.active {
          background-color: #fff !important;
          color: #5a374b !important;
        }

        .badge {
          font-size: 0.65rem;
        }

        .btn-warning {
          background-color: #937f6a !important;
          border: none;
        }

        .btn-light {
          background-color: #f8f9fa;
          color: #5a374b;
          border: none;
        }

        .btn-light:hover {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
};

export default HomeAdmin;
