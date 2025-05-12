import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBefore from "../components/Home/HomeBefore";
import ProfilPenitip from "../components/Profil/ProfilPenitip";
import ProfilPembeli from "../components/Profil/ProfilPembeli"; 
import FormLogin from "../components/Form/FormLogin";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/profilpenitip" element={<ProfilPenitip />} />
        <Route path="/profilpembeli" element={<ProfilPembeli />} />
        <Route path="/login" element={<FormLogin />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

