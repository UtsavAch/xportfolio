import { useEffect, useState } from "react";
import { UilPen, UilPlus, UilTrash } from "@iconscout/react-unicons";
import { useAuth } from "../../contexts/AuthContext";
import educationService from "../../management/services/educationService";
import coursesService from "../../management/services/coursesService";
import Card from "../../components/card/Card.Component";
import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";
import CmsOverlay from "../../components/cmsoverlay/CmsOverlay.component";
import formatDate from "../../helpers/formatDate";

const educationFields = [
  { name: "university", label: "University", type: "text" },
  { name: "degree", label: "Degree", type: "text" },
  { name: "start_date", label: "Start Date", type: "date" },
  { name: "end_date", label: "End Date", type: "date" },
  { name: "description", label: "Description", type: "text" },
];

const courseFields = [
  { name: "title", label: "Course Title", type: "text" },
  { name: "link", label: "Certificate/Course Link", type: "text" },
  { name: "start_date", label: "Start Date", type: "date" },
  { name: "end_date", label: "End Date", type: "date" },
  { name: "description", label: "Description", type: "text" },
];

const EducationTab = () => {
  const { isLoggedIn } = useAuth(); //
  const [education, setEducation] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [targetType, setTargetType] = useState(null);
  const [overlayMode, setOverlayMode] = useState("create");

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

  const handleAddClick = (type) => {
    if (!isLoggedIn) return;
    setOverlayMode("create");
    setTargetType(type);
    setEditingItem({});
    setIsOverlayOpen(true);
  };

  const handleEditClick = (item, type) => {
    if (!isLoggedIn) return;
    setOverlayMode("update");
    setTargetType(type);
    setEditingItem(item);
    setIsOverlayOpen(true);
  };

  const handleDeleteClick = async (id, type) => {
    if (!isLoggedIn || !window.confirm("Delete this entry?")) return;
    try {
      if (type === "education") {
        await educationService.deleteEducation(id); //
        setEducation((prev) => prev.filter((item) => item.id !== id));
      } else {
        await coursesService.deleteCourse(id); //
        setCourses((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleFormSubmit = async (formData, mode) => {
    if (!isLoggedIn) return;

    // FIX: Clean the payload. Only send fields defined in your config.
    // This prevents sending 'id' or 'created_at' in the body, which often causes API errors.
    const fieldConfig =
      targetType === "education" ? educationFields : courseFields;
    const cleanData = {};
    fieldConfig.forEach((f) => (cleanData[f.name] = formData[f.name]));

    try {
      if (targetType === "education") {
        if (mode === "create") {
          const newItem = await educationService.createEducation(cleanData); //
          setEducation((prev) => [...prev, newItem]);
        } else {
          await educationService.updateEducation(editingItem.id, cleanData); //
          setEducation((prev) =>
            prev.map((item) =>
              item.id === editingItem.id ? { ...item, ...cleanData } : item,
            ),
          );
        }
      } else if (targetType === "course") {
        if (mode === "create") {
          const newItem = await coursesService.createCourse(cleanData); //
          setCourses((prev) => [...prev, newItem]);
        } else {
          await coursesService.updateCourse(editingItem.id, cleanData); //
          setCourses((prev) =>
            prev.map((item) =>
              item.id === editingItem.id ? { ...item, ...cleanData } : item,
            ),
          );
        }
      }
      setIsOverlayOpen(false);
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to save entry");
    }
  };

  if (loading) return <p>Loading...</p>;

  const adminIconStyle = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "var(--color-highlight)",
    padding: "5px",
  };

  return (
    <TabWrapper>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <h1 style={{ margin: 0 }}>Education</h1>
        {isLoggedIn && (
          <button
            onClick={() => handleAddClick("education")}
            style={{ ...adminIconStyle, marginLeft: "15px" }}
          >
            <UilPlus size="24" />
          </button>
        )}
      </div>

      {education.map((edu) => (
        <Card
          key={edu.id}
          title={edu.university}
          subtitle={edu.degree}
          meta={`${formatDate(edu.start_date)} – ${formatDate(edu.end_date)}`}
          description={edu.description}
          extra={
            isLoggedIn && (
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEditClick(edu, "education")}
                  style={adminIconStyle}
                >
                  <UilPen size="20" />
                </button>
                <button
                  onClick={() => handleDeleteClick(edu.id, "education")}
                  style={{ ...adminIconStyle, color: "#ff4d4d" }}
                >
                  <UilTrash size="20" />
                </button>
              </div>
            )
          }
        />
      ))}

      {/* Courses Section Follows Same Pattern */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ margin: 0 }}>Courses</h2>
        {isLoggedIn && (
          <button
            onClick={() => handleAddClick("course")}
            style={{ ...adminIconStyle, marginLeft: "15px" }}
          >
            <UilPlus size="24" />
          </button>
        )}
      </div>

      {courses.map((course) => (
        <Card
          key={course.id}
          title={course.title}
          meta={`${formatDate(course.start_date)} – ${formatDate(course.end_date)}`}
          description={course.description}
          extra={
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
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
              {isLoggedIn && (
                <>
                  <button
                    onClick={() => handleEditClick(course, "course")}
                    style={adminIconStyle}
                  >
                    <UilPen size="20" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(course.id, "course")}
                    style={{ ...adminIconStyle, color: "#ff4d4d" }}
                  >
                    <UilTrash size="20" />
                  </button>
                </>
              )}
            </div>
          }
        />
      ))}

      <CmsOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        mode={overlayMode}
        resourceName={targetType}
        fields={targetType === "education" ? educationFields : courseFields}
      />
    </TabWrapper>
  );
};

export default EducationTab;

// import { useEffect, useState } from "react";
// import { UilPen, UilPlus, UilTrash } from "@iconscout/react-unicons"; // Added UilTrash
// import { useAuth } from "../../contexts/AuthContext";
// import educationService from "../../management/services/educationService";
// import coursesService from "../../management/services/coursesService";
// import Card from "../../components/card/Card.Component";
// import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";
// import CmsOverlay from "../../components/cmsoverlay/CmsOverlay.component";
// import formatDate from "../../helpers/formatDate";

// // Configuration for Education Fields
// const educationFields = [
//   { name: "university", label: "University", type: "text" },
//   { name: "degree", label: "Degree", type: "text" },
//   { name: "start_date", label: "Start Date", type: "date" },
//   { name: "end_date", label: "End Date", type: "date" },
//   { name: "description", label: "Description", type: "text" },
// ];

// // Configuration for Course Fields
// const courseFields = [
//   { name: "title", label: "Course Title", type: "text" },
//   { name: "link", label: "Certificate/Course Link", type: "text" },
//   { name: "start_date", label: "Start Date", type: "date" },
//   { name: "end_date", label: "End Date", type: "date" },
//   { name: "description", label: "Description", type: "text" },
// ];

// const EducationTab = () => {
//   const { isLoggedIn } = useAuth(); // Get auth state
//   const [education, setEducation] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for Overlay
//   const [isOverlayOpen, setIsOverlayOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [targetType, setTargetType] = useState(null);
//   const [overlayMode, setOverlayMode] = useState("create");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [educationData, coursesData] = await Promise.all([
//           educationService.getAllEducation(),
//           coursesService.getAllCourses(),
//         ]);
//         setEducation(educationData);
//         setCourses(coursesData);
//       } catch (err) {
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // --- Handlers ---

//   const handleAddClick = (type) => {
//     if (!isLoggedIn) return;
//     setOverlayMode("create");
//     setTargetType(type);
//     setEditingItem({});
//     setIsOverlayOpen(true);
//   };

//   const handleEditClick = (item, type) => {
//     if (!isLoggedIn) return;
//     setOverlayMode("update");
//     setTargetType(type);
//     setEditingItem(item);
//     setIsOverlayOpen(true);
//   };

//   const handleDeleteClick = async (id, type) => {
//     if (!isLoggedIn) return;

//     // Simple confirmation before deleting
//     if (!window.confirm("Are you sure you want to delete this entry?")) return;

//     try {
//       if (type === "education") {
//         await educationService.deleteEducation(id);
//         setEducation((prev) => prev.filter((item) => item.id !== id));
//       } else if (type === "course") {
//         await coursesService.deleteCourse(id);
//         setCourses((prev) => prev.filter((item) => item.id !== id));
//       }
//     } catch (err) {
//       console.error("Delete failed", err);
//       alert("Failed to delete entry");
//     }
//   };

//   const handleCloseOverlay = () => {
//     setIsOverlayOpen(false);
//     setEditingItem(null);
//     setTargetType(null);
//   };

//   const handleFormSubmit = async (formData, mode) => {
//     if (!isLoggedIn) return;

//     try {
//       if (targetType === "education") {
//         if (mode === "create") {
//           const newItem = await educationService.createEducation(formData);
//           setEducation((prev) => [...prev, newItem]);
//         } else {
//           await educationService.updateEducation(editingItem.id, formData);
//           setEducation((prev) =>
//             prev.map((item) => (item.id === editingItem.id ? formData : item)),
//           );
//         }
//       } else if (targetType === "course") {
//         if (mode === "create") {
//           const newItem = await coursesService.createCourse(formData);
//           setCourses((prev) => [...prev, newItem]);
//         } else {
//           await coursesService.updateCourse(editingItem.id, formData);
//           setCourses((prev) =>
//             prev.map((item) => (item.id === editingItem.id ? formData : item)),
//           );
//         }
//       }
//       handleCloseOverlay();
//     } catch (err) {
//       console.error("Operation failed", err);
//       alert("Failed to save entry");
//     }
//   };

//   if (loading) return <p>Loading education...</p>;
//   if (error) return <p>{error}</p>;

//   // Styles for admin action buttons
//   const iconButtonStyle = {
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     color: "var(--color-highlight)",
//     display: "flex",
//     alignItems: "center",
//     padding: "5px",
//   };

//   const headerAddButtonStyle = {
//     ...iconButtonStyle,
//     marginLeft: "15px",
//   };

//   return (
//     <TabWrapper>
//       {/* Education Header */}
//       <div
//         style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
//       >
//         <h1 style={{ margin: 0 }}>Education</h1>
//         {isLoggedIn && (
//           <button
//             onClick={() => handleAddClick("education")}
//             style={headerAddButtonStyle}
//           >
//             <UilPlus size="24" />
//           </button>
//         )}
//       </div>

//       {education.length === 0 ? (
//         <p>No education found</p>
//       ) : (
//         education.map((edu) => (
//           <Card
//             key={edu.id}
//             title={edu.university}
//             subtitle={edu.degree}
//             meta={`${formatDate(edu.start_date)} – ${formatDate(edu.end_date)}`}
//             description={edu.description}
//             extra={
//               // Only show Edit/Delete controls if logged in
//               isLoggedIn && (
//                 <div style={{ display: "flex", gap: "5px" }}>
//                   <button
//                     onClick={() => handleEditClick(edu, "education")}
//                     style={iconButtonStyle}
//                     title="Edit"
//                   >
//                     <UilPen size="20" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteClick(edu.id, "education")}
//                     style={{ ...iconButtonStyle, color: "#ff4d4d" }} // Red color for delete
//                     title="Delete"
//                   >
//                     <UilTrash size="20" />
//                   </button>
//                 </div>
//               )
//             }
//           />
//         ))
//       )}

//       {/* Courses Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           marginTop: "2rem",
//           marginBottom: "1rem",
//         }}
//       >
//         <h2 style={{ margin: 0 }}>Courses</h2>
//         {isLoggedIn && (
//           <button
//             onClick={() => handleAddClick("course")}
//             style={headerAddButtonStyle}
//           >
//             <UilPlus size="24" />
//           </button>
//         )}
//       </div>

//       {courses.length === 0 ? (
//         <p>No courses found</p>
//       ) : (
//         courses.map((course) => (
//           <Card
//             key={course.id}
//             title={course.title}
//             meta={`${formatDate(course.start_date)} – ${formatDate(course.end_date)}`}
//             description={course.description}
//             extra={
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "15px" }}
//               >
//                 {course.link && (
//                   <a
//                     href={course.link}
//                     target="_blank"
//                     rel="noreferrer"
//                     style={{ color: "var(--color-highlight)" }}
//                   >
//                     Link
//                   </a>
//                 )}
//                 {/* Only show Edit/Delete controls if logged in */}
//                 {isLoggedIn && (
//                   <>
//                     <button
//                       onClick={() => handleEditClick(course, "course")}
//                       style={iconButtonStyle}
//                       title="Edit"
//                     >
//                       <UilPen size="20" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteClick(course.id, "course")}
//                       style={{ ...iconButtonStyle, color: "#ff4d4d" }}
//                       title="Delete"
//                     >
//                       <UilTrash size="20" />
//                     </button>
//                   </>
//                 )}
//               </div>
//             }
//           />
//         ))
//       )}

//       {/* Generic CMS Overlay - Only renders if logged in, extra safety */}
//       {isLoggedIn && (
//         <CmsOverlay
//           isOpen={isOverlayOpen}
//           onClose={handleCloseOverlay}
//           onSubmit={handleFormSubmit}
//           initialData={editingItem}
//           mode={overlayMode}
//           resourceName={targetType}
//           fields={targetType === "education" ? educationFields : courseFields}
//         />
//       )}
//     </TabWrapper>
//   );
// };

// export default EducationTab;
