import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomeBefore from "../components/Home/HomeBefore";
import HomeAfter from "../components/Home/HomeAfter";
import LoginPage from "../pages/auth/LoginPage";
import RegisterOrganisasiPage from "../pages/auth/RegisterOrganisasi";
import RegisterPembeliPage from "../pages/auth/RegisterPembeli";
import HomeOrganisasi from "../components/Home/HomeOrganisasi";
import HomeAdmin from "../components/Home/HomeAdmin";
import HomeOwner from "../components/Home/HomeOwner";
import HomeGudang from "../components/Home/HomeGudang";
import Nota from "../components/Home/Nota";
import ProfilPenitip from "../components/Profil/ProfilPenitip";
import Keranjang from "../components/Home/Keranjang";
import DataPenitip from "../components/Admin/DataPenitip";
import Komisi from "../components/Admin/Komisi";
import PaymentAndRating from "../components/Home/PaymentAndRating";
import DataPegawai from "../components/Admin/DataPegawai";
import LaporanPage from "../components/Owner/LaporanPage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    path: "/",
    element: <HomeBefore />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registerPembeli",
    element: <RegisterPembeliPage />,
  },
  {
    path: "/registerOrganisasi",
    element: <RegisterOrganisasiPage />,
  },
  {
    path: "/homeAfter",
    element: <HomeAfter />,
  },
  {
    path: "/homeOrganisasi",
    element: <HomeOrganisasi />,
  },
  {
    path: "/homeAdmin",
    element: <HomeAdmin />,
  },
  {
    path: "/homeOwner",
    element: <HomeOwner />,
  },
  {
    path: "/homeGudang",
    element: <HomeGudang />,
  },
  {
    path: "/profilPenitip",
    element: <ProfilPenitip />,
  },
  {
    path: "/keranjang",
    element: <Keranjang />,
  },
  {
    path: "/nota",
    element: <Nota />,
  },
  {
    path: "/paymentSuccess",
    element: <PaymentAndRating productId={1} />,
  },
  {
    path: "/admin/penitip",
    element: <DataPenitip />,
  },
  {
    path: "/admin/komisi",
    element: <Komisi />,
  },
  {
    path: "/home/keranjang",
    element: <Keranjang />,
  },
  {
    path: "/admin/datapegawai",
    element: <DataPegawai />,
  },
  {
    path: "/homeOwner/laporan",
    element: <LaporanPage />,
  },
  {
    path: "homeOwner/laporan/LaporanStokGudang",
    element: <generateLaporanStokGudang />,
  },
  {
    path: "homeOwner/laporan/LaporanPerKategori",
    element: <generateLaporanStokGudang />,
  },
]);

const AppRouter = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
