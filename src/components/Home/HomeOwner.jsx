import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Request Donasi", path: "request" },
  { label: "History Donasi", path: "historydonasi" },
  { label: "Laporan", path: "laporan" },
  { label: "Data Organisasi", path: "dataorgan" },
  { label: "Profile", path: "profile" },
];

const HomeOwner = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f1f1f3",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: collapsed ? "80px" : "250px",
          backgroundColor: "#5a374b",
          color: "#fff",
          padding: "20px 15px",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
          position: "relative",
          zIndex: 100,
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center mb-4"
          style={{ padding: collapsed ? "0 10px" : "0" }}
        >
          {!collapsed && (
            <h4
              style={{
                margin: 0,
                fontWeight: "700",
                fontSize: "1.5rem",
                letterSpacing: "1px",
                userSelect: "none",
              }}
            >
              Home Owner
            </h4>
          )}
          <button
            className="btn btn-sm btn-light"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "#fff",
              fontSize: "1.2rem",
              cursor: "pointer",
              padding: collapsed ? "0" : "5px 8px",
              transition: "color 0.3s",
            }}
            aria-label="Toggle sidebar"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <nav style={{ flexGrow: 1 }}>
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `d-flex align-items-center mb-3 px-3 py-2 rounded text-decoration-none ${
                  isActive ? "active" : ""
                }`
              }
              style={{
                fontWeight: 600,
                fontSize: "1rem",
                color: "#fff",
                gap: collapsed ? 0 : 10,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "background-color 0.3s, color 0.3s",
              }}
              title={label}
            >
              <i
                className="fas fa-circle"
                style={{
                  fontSize: "0.7rem",
                  transform: "scale(1.2)",
                  color: "rgba(255,255,255,0.7)",
                }}
              ></i>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/login"
          className="btn btn-warning text-dark mt-auto d-flex align-items-center justify-content-center"
          style={{
            border: "none",
            fontWeight: "600",
            fontSize: "1rem",
            gap: collapsed ? 0 : 10,
            padding: collapsed ? "10px 0" : "10px 20px",
            borderRadius: "6px",
            userSelect: "none",
          }}
          title="Logout"
        >
          <i className="fas fa-sign-out-alt"></i>
          {!collapsed && <span>Logout</span>}
        </NavLink>
      </div>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          backgroundColor: "#fff",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <header
          className="px-4 py-3 d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #ddd",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            userSelect: "none",
          }}
        >
          <div>
            <h5
              className="mb-1"
              style={{
                color: "#5a374b",
                fontWeight: 700,
                fontSize: "1.2rem",
              }}
            >
              Selamat datang, Home Owner! 👋
            </h5>
            <small style={{ color: "#937f6a", fontWeight: 500 }}>
              {currentTime.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              • {currentTime.toLocaleTimeString("id-ID")}
            </small>
          </div>
          <div
            className="d-flex align-items-center gap-3"
            style={{ cursor: "default" }}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Home Owner"
              className="rounded-circle"
              style={{
                border: "2px solid #937f6a",
                boxShadow: "0 0 8px rgba(147, 127, 106, 0.7)",
              }}
            />
          </div>
        </header>

        {/* Content (Nested Route) */}
        <section
          className="p-4"
          style={{ flexGrow: 1, backgroundColor: "#f8f9fa", overflowY: "auto" }}
        >
          <Outlet />
        </section>
      </main>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        .nav-link:hover {
          background-color: #6e4e5d !important;
          color: white !important;
        }

        .nav-link.active {
          background-color: #fff !important;
          color: #5a374b !important;
          font-weight: 700 !important;
        }

        button.btn.btn-sm.btn-light:hover {
          color: #937f6a !important;
          background-color: transparent !important;
        }

        .btn-warning {
          background-color: #937f6a !important;
          border: none !important;
          transition: background-color 0.3s ease;
        }
        .btn-warning:hover {
          background-color: #5a374b !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default HomeOwner;
