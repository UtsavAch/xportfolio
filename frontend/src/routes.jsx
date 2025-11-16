import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CmsPage from "./pages/cms/Cms.Page";
import LoginPage from "./pages/login/Login.Page";
import PublicPage from "./pages/public/Public.Page";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cms" element={<CmsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/public" element={<PublicPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
