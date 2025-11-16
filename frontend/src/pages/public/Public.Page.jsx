import { useState } from "react";
import "./Public.Style.css";

import ContactComponentPublic from "../../components/publicComp/contact/Contact.Component.jsx";
import EducationComponentPublic from "../../components/publicComp/education/Education.Component.jsx";
import ExperienceComponentPublic from "../../components/publicComp/experience/Experience.Component.jsx";
import ProfileComponentPublic from "../../components/publicComp/profile/Profile.Component.jsx";
import ProjectsComponentPublic from "../../components/publicComp/projects/Projects.Component.jsx";

function PublicPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = ["Profile", "Education", "Experience", "Projects", "Contact"];

  return (
    <div className="public-page">
      <h1 className="public-title">Public Page</h1>

      {/* Tabs */}
      <div className="public-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`public-tab ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render selected tab */}
      <div className="public-tab-content">
        {activeTab === "Profile" && <ProfileComponentPublic />}
        {activeTab === "Education" && <EducationComponentPublic />}
        {activeTab === "Experience" && <ExperienceComponentPublic />}
        {activeTab === "Projects" && <ProjectsComponentPublic />}
        {activeTab === "Contact" && <ContactComponentPublic />}
      </div>
    </div>
  );
}

export default PublicPage;
