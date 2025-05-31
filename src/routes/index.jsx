import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBefore from "../components/Home/HomeBefore";
import ProfilPenitip from "../components/Profil/ProfilPenitip";
import ProfilPembeli from "../components/Profil/ProfilPembeli"; 
import FormLogin from "../components/Form/FormLogin";
import FormOrganisasi from "../components/Form/FormOrganisasi";
import FormRegister from "../components/Form/FormRegister";
import HomeAdmin from "../components/Home/HomeAdmin";
import DataPegawai from "../components/Admin/DataPegawai";
import DataPembeli from "../components/Admin/DataPembeli";
import DataPenitip from "../components/Admin/DataPenitip";
import DataOrganisasi from "../components/Admin/DataOrganisasi";
import RequestDonasi from "../components/Admin/RequestDonasi";
import Request from "../components/Owner/Request";
import HistoryDonasi from "../components/Owner/HistoryDonasi";
import RegisterPembeli from "../components/Admin/RegistrasiPembeli";
import HomeAfter from "../components/Home/HomeAfter";
import profil from "../components/Profil/profil"
import Keranjang from "../components/Home/Keranjang";
import Merchandise from "../components/Admin/Merchandise";
import Barang from "../components/Admin/Barang";
import HomeOwner from "../components/Home/HomeOwner";
import LaporanPage from "../components/Owner/LaporanPage";
import DataOrgan from "../components/Owner/DataOrgan";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/owner" element={<HomeOwner />} />
        <Route path="/admin/datapegawai" element={<DataPegawai />} />
        <Route path="/admin/datapembeli" element={<DataPembeli />} />
        <Route path="/admin/datapenitip" element={<DataPenitip />} />
        <Route path="/admin/dataorganisasi" element={<DataOrganisasi />} />
        <Route path="/admin/requestonasi" element={<RequestDonasi />} />
        <Route path="/owner/request" element={<Request />} />
        <Route path="/owner/historydonasi" element={<HistoryDonasi />} />
        <Route path="/owner/dataorgan" element={<DataOrgan />} />
        <Route path="/admin/merchandise" element={<Merchandise />} />
        <Route path="/admin/barang" element={<Barang />} />
        <Route path="/profilpenitip" element={<ProfilPenitip />} />
        <Route path="/profil-pembeli" element={<ProfilPembeli />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/formorganisasi" element={<FormOrganisasi />} />
        <Route path="/registerpembeli" element={<RegisterPembeli />} />
        <Route path="/homeafter" element={<HomeAfter/>} />
        <Route path="/profil" element={<profil/>} />
        <Route path="/keranjang" element={<Keranjang/>} />
        <Route path="/owner/laporan" element={<LaporanPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;