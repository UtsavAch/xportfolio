import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar.Component";
import ProfileTab from "../../tabs/profile/Profile.Tab";
import EducationTab from "../../tabs/education/Education.Tab";
import ExperienceTab from "../../tabs/experience/Experience.Tab";
import ProjectsTab from "../../tabs/projects/Projects.Tab";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Configuration for your tabs (If you make new tabs, add them here)
  const tabConfig = [
    { id: "profile", label: "Profile", component: <ProfileTab /> },
    { id: "education", label: "Education", component: <EducationTab /> },
    { id: "experience", label: "Experience", component: <ExperienceTab /> },
    { id: "projects", label: "Projects", component: <ProjectsTab /> },
  ];

  // Find the component to render based on active state
  const renderContent = () => {
    const active = tabConfig.find((t) => t.id === activeTab);
    return active ? active.component : <ProfileTab />;
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
