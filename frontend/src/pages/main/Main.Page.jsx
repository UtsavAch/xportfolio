import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar.Component";
import AboutTab from "../../tabs/about/About.Tab";
import EducationTab from "../../tabs/education/Education.Tab";
import ProfileTab from "../../tabs/experience/Experience.Tab";
import ProjectsTab from "../../tabs/projects/Projects.Tab";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("about");

  // Configuration for your tabs (If you make new tabs, add them here)
  const tabConfig = [
    { id: "about", label: "About Me", component: <AboutTab /> },
    { id: "education", label: "Education", component: <EducationTab /> },
    { id: "profile", label: "Experience", component: <ProfileTab /> },
    { id: "projects", label: "Projects", component: <ProjectsTab /> },
  ];

  // Find the component to render based on active state
  const renderContent = () => {
    const active = tabConfig.find((t) => t.id === activeTab);
    return active ? active.component : <AboutTab />;
  };

  return (
    <main
      className="main-page"
      style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}
    >
      <Navbar
        tabs={tabConfig}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="tab-content">{renderContent()}</div>
    </main>
  );
};

export default MainPage;
