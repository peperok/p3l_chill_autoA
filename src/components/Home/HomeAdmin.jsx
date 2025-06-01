// src/components/Home/HomeAdmin.jsx
import React from "react";
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
];

const PlaceholderPage = ({ title }) => (
  <div className="text-center mt-4">
    <h1 className="h3 text-primary">{title}</h1>
    <p>Halaman {title} akan dikembangkan lebih lanjut.</p>
  </div>
);

const HomeAdmin = () => {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="bg-dark text-white d-flex flex-column p-3"
        style={{ width: "250px" }}
      >
        <h4 className="text-center mb-4">ReuseMart</h4>
        {navItems.map((item) => (
          <NavLink
            key={item}
            to={`/admin/${item.replace(/ /g, "").toLowerCase()}`}
            className={({ isActive }) =>
              `py-2 px-3 text-white text-decoration-none rounded mb-1 ${
                isActive ? "bg-secondary" : "hover:bg-light text-white"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
        <NavLink
          to="/login"
          className="mt-auto btn btn-warning text-dark text-center"
        >
          Logout
        </NavLink>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4 bg-light overflow-auto">
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
  );
};

export default HomeAdmin;
