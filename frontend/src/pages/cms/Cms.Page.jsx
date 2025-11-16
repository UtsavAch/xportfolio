import { useState } from "react";
import "./Cms.Style.css";

import CoursesComponentCMS from "../../components/cmsComp/courses/Courses.Component";
import EducationComponentCMS from "../../components/cmsComp/education/Education.Component";
import ExperienceComponentCMS from "../../components/cmsComp/experience/Experience.Component";
import MediaComponentCMS from "../../components/cmsComp/media/Media.Component";
import MessagesComponentCMS from "../../components/cmsComp/messages/Messages.Component";
import ProfileComponentCMS from "../../components/cmsComp/profile/Profile.Component";
import ProjectsComponentCMS from "../../components/cmsComp/projects/Projects.Component";
import SkillsComponentCMS from "../../components/cmsComp/skills/Skills.Component";

function CmsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    "Profile",
    "Skills",
    "Education",
    "Experience",
    "Projects",
    "Courses",
    "Media",
    "Messages",
  ];

  return (
    <div className="cms-page">
      <h1 className="cms-title">CMS Page</h1>

      {/* Tabs */}
      <div className="cms-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cms-tab ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render selected tab */}
      <div className="cms-tab-content">
        {activeTab === "Profile" && <ProfileComponentCMS />}
        {activeTab === "Skills" && <SkillsComponentCMS />}
        {activeTab === "Education" && <EducationComponentCMS />}
        {activeTab === "Experience" && <ExperienceComponentCMS />}
        {activeTab === "Projects" && <ProjectsComponentCMS />}
        {activeTab === "Courses" && <CoursesComponentCMS />}
        {activeTab === "Media" && <MediaComponentCMS />}
        {activeTab === "Messages" && <MessagesComponentCMS />}
      </div>
    </div>
  );
}

export default CmsPage;
