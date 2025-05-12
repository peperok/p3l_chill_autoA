

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBefore from "../components/Home/HomeBefore";
import HomeAfter from "../components/Home/HomeAfter";
import ProfilPenitip from "../components/Profil/ProfilPenitip";
import ProfilPembeli from "../components/Profil/ProfilPembeli"; // pastikan file ini ada

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/homebefore" element={<HomeBefore />} />
        <Route path="/profilpenitip" element={<ProfilPenitip />} />
        <Route path="/profilpembeli" element={<ProfilPembeli />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

