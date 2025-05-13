import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBefore from "../components/Home/HomeBefore";
import ProfilPenitip from "../components/Profil/ProfilPenitip";
import ProfilPembeli from "../components/Profil/ProfilPembeli"; 
import FormLogin from "../components/Form/FormLogin";
import FormRegister from "../components/Form/FormRegister";
import HomeAdmin from "../components/Home/HomeAdmin";
import DetailBarang from "../pages/DetailBarang";
import HomeAfter from "../components/Home/HomeAfter";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/profilpenitip" element={<ProfilPenitip />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/detailbarang" element={<DetailBarang />} />
        <Route path="/" element={<HomeAfter />} />
        <Route path="/profil-pembeli" element={<ProfilPembeli />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;