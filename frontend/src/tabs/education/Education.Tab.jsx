import { useEffect, useState } from "react";
import { UilPen, UilPlus } from "@iconscout/react-unicons";
import educationService from "../../management/services/educationService";
import coursesService from "../../management/services/coursesService";
import Card from "../../components/card/Card.Component";
import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";
import CmsOverlay from "../../components/cmsoverlay/CmsOverlay.component";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
      })
    : "Present";

// Configuration for Education Fields
const educationFields = [
  { name: "university", label: "University", type: "text" },
  { name: "degree", label: "Degree", type: "text" },
  { name: "start_date", label: "Start Date", type: "date" }, // Changed to date
  { name: "end_date", label: "End Date", type: "date" }, // Changed to date
  { name: "description", label: "Description", type: "text" },
];

// Configuration for Course Fields
const courseFields = [
  { name: "title", label: "Course Title", type: "text" },
  { name: "link", label: "Certificate/Course Link", type: "text" },
  { name: "start_date", label: "Start Date", type: "date" }, // Changed to date
  { name: "end_date", label: "End Date", type: "date" }, // Changed to date
  { name: "description", label: "Description", type: "text" },
];

const EducationTab = () => {
  const [education, setEducation] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Overlay
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [targetType, setTargetType] = useState(null); // 'education' or 'course'
  const [overlayMode, setOverlayMode] = useState("create"); // 'create' or 'update'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [educationData, coursesData] = await Promise.all([
          educationService.getAllEducation(),
          coursesService.getAllCourses(),
        ]);
        setEducation(educationData);
        setCourses(coursesData);
      } catch (err) {
        setError("Failed to load education data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Handlers ---

  const handleAddClick = (type) => {
    setOverlayMode("create");
    setTargetType(type);
    setEditingItem({}); // Empty object for creation
    setIsOverlayOpen(true);
  };

  const handleEditClick = (item, type) => {
    setOverlayMode("update");
    setTargetType(type);
    setEditingItem(item);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setEditingItem(null);
    setTargetType(null);
  };

  const handleFormSubmit = async (formData, mode) => {
    try {
      if (targetType === "education") {
        if (mode === "create") {
          const newItem = await educationService.createEducation(formData);
          setEducation((prev) => [...prev, newItem]);
        } else {
          await educationService.updateEducation(editingItem.id, formData);
          setEducation((prev) =>
            prev.map((item) => (item.id === editingItem.id ? formData : item))
          );
        }
      } else if (targetType === "course") {
        if (mode === "create") {
          const newItem = await coursesService.createCourse(formData);
          setCourses((prev) => [...prev, newItem]);
        } else {
          await coursesService.updateCourse(editingItem.id, formData);
          setCourses((prev) =>
            prev.map((item) => (item.id === editingItem.id ? formData : item))
          );
        }
      }
      handleCloseOverlay();
    } catch (err) {
      console.error("Operation failed", err);
      alert("Failed to save entry");
    }
  };

  if (loading) return <p>Loading education...</p>;
  if (error) return <p>{error}</p>;

  // Helper style for the Add Button
  const addBtnStyle = {
    background: "transparent",
    border: "none",
    color: "var(--color-highlight)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    marginLeft: "15px",
  };

  return (
    <TabWrapper>
      {/* Education Header with Add Button */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <h1 style={{ margin: 0 }}>Education</h1>
        <button onClick={() => handleAddClick("education")} style={addBtnStyle}>
          <UilPlus size="24" />
        </button>
      </div>

      {education.length === 0 ? (
        <p>No education found</p>
      ) : (
        education.map((edu) => (
          <Card
            key={edu.id}
            title={edu.university}
            subtitle={edu.degree}
            meta={`${formatDate(edu.start_date)} – ${formatDate(edu.end_date)}`}
            description={edu.description}
            extra={
              <button
                onClick={() => handleEditClick(edu, "education")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-highlight)",
                }}
              >
                <UilPen size="20" />
              </button>
            }
          />
        ))
      )}

      {/* Courses Header with Add Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ margin: 0 }}>Courses</h2>
        <button onClick={() => handleAddClick("course")} style={addBtnStyle}>
          <UilPlus size="24" />
        </button>
      </div>

      {courses.length === 0 ? (
        <p>No courses found</p>
      ) : (
        courses.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            meta={`${formatDate(course.start_date)} – ${formatDate(
              course.end_date
            )}`}
            description={course.description}
            extra={
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                {course.link && (
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--color-highlight)" }}
                  >
                    Link
                  </a>
                )}
                <button
                  onClick={() => handleEditClick(course, "course")}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-highlight)",
                  }}
                >
                  <UilPen size="20" />
                </button>
              </div>
            }
          />
        ))
      )}

      {/* Generic CMS Overlay */}
      <CmsOverlay
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        mode={overlayMode}
        resourceName={targetType} // This passes "education" or "course"
        fields={targetType === "education" ? educationFields : courseFields}
      />
    </TabWrapper>
  );
};

export default EducationTab;
