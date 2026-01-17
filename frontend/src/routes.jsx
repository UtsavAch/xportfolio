import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/Login.Page";
import MainPage from "./pages/main/Main.Page";
import { AuthProvider } from "./contexts/AuthContext";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
