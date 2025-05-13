import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBefore from "../components/Home/HomeBefore";
import ProfilPenitip from "../components/Profil/ProfilPenitip";
import ProfilPembeli from "../components/Profil/ProfilPembeli"; 
import FormLogin from "../components/Form/FormLogin";
import HomeAdmin from "../components/Home/HomeAdmin";
import DataPegawai from "../components/Admin/DataPegawai";
import DataPembeli from "../components/Admin/DataPembeli";
import DataPenitip from "../components/Admin/DataPenitip";
import DataOrganisasi from "../components/Admin/DataOrganisasi";
import RequestDonasi from "../components/Admin/RequestDonasi";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/datapegawai" element={<DataPegawai />} />
        <Route path="/admin/datapembeli" element={<DataPembeli />} />
        <Route path="/admin/datapenitip" element={<DataPenitip />} />
        <Route path="/admin/dataorganisasi" element={<DataOrganisasi />} />
         <Route path="/admin/reqdonasi" element={<RequestDonasi />} />
        <Route path="/profilpenitip" element={<ProfilPenitip />} />
        <Route path="/profilpembeli" element={<ProfilPembeli />} />
        <Route path="/login" element={<FormLogin />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;