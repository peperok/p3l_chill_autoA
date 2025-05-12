import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from "react-router-dom";
import HomeBefore from "../components/Home/HomeBefore.jsx";
import LoginPage from "../components/Form/FormLogin.jsx";
import RegisterPage from "../pages/auth/RegisterPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/homebefore" element={<HomeBefore />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Tambahkan route lain jika diperlukan */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;

