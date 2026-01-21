import { useEffect, useState } from "react";

import { UilGraduationCap, UilBookOpen } from "@iconscout/react-unicons";

import { useAuth } from "../../contexts/AuthContext";
import educationService from "../../services/educationService";
import coursesService from "../../services/coursesService";
import Card from "../../components/card/Card.Component";
import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";
import CmsOverlay from "../../components/cmsoverlay/CmsOverlay.component";
import CmsButton from "../../components/cmsbutton/CmsButton.Component";
import ErrorMessage from "../../components/error/Error.Component";
import Confirm from "../../components/confirm/Confirm.Component";
import formatDate from "../../helpers/formatDate";
import SectionTitle from "../../components/sectiontitle/SectionTitle.Component";
import Footer from "../../components/footer/Footer.Component";
import GridWrapper from "../../components/gridwrapper/GridWrapper.Component";
import Spinner from "../../components/spinner/Spinner.Component";

// Import Styled Components
import { HeaderContainer, ActionGroup } from "./Education.Style";

const educationFields = [
  { name: "university", label: "University", type: "text" },
  { name: "degree", label: "Degree", type: "text" },
  { name: "location", label: "Location", type: "text" },
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
  const { isLoggedIn } = useAuth();
  const [education, setEducation] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [targetType, setTargetType] = useState(null);
  const [overlayMode, setOverlayMode] = useState("create");

  const [confirmData, setConfirmData] = useState({
    isOpen: false,
    id: null,
    type: null,
  });

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
        setError("Failed to load education data.");
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

  const handleDeleteClick = (id, type) => {
    if (!isLoggedIn) return;
    setConfirmData({
      isOpen: true,
      id: id,
      type: type,
    });
  };

  const confirmDelete = async () => {
    const { id, type } = confirmData;
    try {
      if (type === "education") {
        await educationService.deleteEducation(id);
        setEducation((prev) => prev.filter((item) => item.id !== id));
      } else {
        await coursesService.deleteCourse(id);
        setCourses((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      setError("Delete failed.");
    } finally {
      setConfirmData({ isOpen: false, id: null, type: null });
    }
  };

  const handleFormSubmit = async (formData, mode) => {
    if (!isLoggedIn) return;
    const fieldConfig =
      targetType === "education" ? educationFields : courseFields;
    const cleanData = {};
    fieldConfig.forEach((f) => (cleanData[f.name] = formData[f.name]));

    try {
      if (targetType === "education") {
        if (mode === "create") {
          const newItem = await educationService.createEducation(cleanData);
          setEducation((prev) => [...prev, newItem]);
        } else {
          await educationService.updateEducation(editingItem.id, cleanData);
          setEducation((prev) =>
            prev.map((item) =>
              item.id === editingItem.id ? { ...item, ...cleanData } : item,
            ),
          );
        }
      } else {
        if (mode === "create") {
          const newItem = await coursesService.createCourse(cleanData);
          setCourses((prev) => [...prev, newItem]);
        } else {
          await coursesService.updateCourse(editingItem.id, cleanData);
          setCourses((prev) =>
            prev.map((item) =>
              item.id === editingItem.id ? { ...item, ...cleanData } : item,
            ),
          );
        }
      }
      setIsOverlayOpen(false);
    } catch (err) {
      setError("Failed to save entry.");
    }
  };

  if (loading) {
    return (
      <TabWrapper>
        <Spinner message="Loading educations and courses..." />
      </TabWrapper>
    );
  }

  return (
    <TabWrapper>
      <ErrorMessage message={error} onClear={() => setError(null)} />

      <Confirm
        isOpen={confirmData.isOpen}
        message={`Are you sure you want to permanently remove this ${confirmData.type}?`}
        confirmText="Delete"
        variant="danger" // Makes the button red
        onConfirm={confirmDelete}
        onCancel={() => setConfirmData({ isOpen: false, id: null, type: null })}
      />

      <HeaderContainer>
        <SectionTitle icon={<UilGraduationCap size="28" />}>
          Education
        </SectionTitle>
        {isLoggedIn && (
          <CmsButton
            type="add"
            onClick={() => handleAddClick("education")}
            style={{ marginLeft: "15px" }} // Keeping a small inline tweak for specific spacing
          />
        )}
      </HeaderContainer>

      <GridWrapper>
        {education.map((edu) => (
          <Card
            key={edu.id}
            title={edu.university}
            subtitle={edu.degree}
            meta={`${formatDate(edu.start_date)} – ${formatDate(edu.end_date) || "Present"}`}
            location={edu.location}
            description={edu.description}
            extra={
              isLoggedIn && (
                <ActionGroup>
                  <CmsButton
                    type="edit"
                    onClick={() => handleEditClick(edu, "education")}
                  />
                  <CmsButton
                    type="delete"
                    onClick={() => handleDeleteClick(edu.id, "education")}
                  />
                </ActionGroup>
              )
            }
          />
        ))}
      </GridWrapper>

      <HeaderContainer $marginTop="2rem">
        <SectionTitle icon={<UilBookOpen size="28" />}>Courses</SectionTitle>
        {isLoggedIn && (
          <CmsButton
            type="add"
            onClick={() => handleAddClick("course")}
            style={{ marginLeft: "15px" }}
          />
        )}
      </HeaderContainer>

      <GridWrapper>
        {courses.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            meta={`${formatDate(course.start_date)} – ${formatDate(course.end_date)}`}
            links={{ url: course.url }}
            description={course.description}
            extra={
              <ActionGroup $gap="15px">
                {isLoggedIn && (
                  <>
                    <CmsButton
                      type="edit"
                      onClick={() => handleEditClick(course, "course")}
                    />
                    <CmsButton
                      type="delete"
                      onClick={() => handleDeleteClick(course.id, "course")}
                    />
                  </>
                )}
              </ActionGroup>
            }
          />
        ))}
      </GridWrapper>

      <CmsOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        mode={overlayMode}
        resourceName={targetType}
        fields={targetType === "education" ? educationFields : courseFields}
      />
      <Footer />
    </TabWrapper>
  );
};

export default EducationTab;
