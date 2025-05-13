import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBefore from "../components/Home/HomeBefore";
import ProfilPenitip from "../components/Profil/ProfilPenitip";
import ProfilPembeli from "../components/Profil/ProfilPembeli"; 
import FormLogin from "../components/Form/FormLogin";
import FormRegister from "../components/Form/FormRegister";
import HomeAdmin from "../components/Home/HomeAdmin";
import DetailBarang from "../pages/DetailBarang";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/profilpenitip" element={<ProfilPenitip />} />
        <Route path="/profilpembeli" element={<ProfilPembeli />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/detailbarang" element={<DetailBarang />} />

      </Routes>
    </Router>
  );
}

export default AppRoutes;