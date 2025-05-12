import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBefore from "../components/Home/HomeBefore.jsx";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBefore />} />
        {/* Tambahkan route lain jika diperlukan */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
