import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalArea from "./pages/PersonalArea/PersonalArea";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/personal-area" element={<PersonalArea />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
