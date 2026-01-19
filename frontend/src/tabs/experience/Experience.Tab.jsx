import { useEffect, useState } from "react";

import { UilBriefcaseAlt } from "@iconscout/react-unicons";

import { useAuth } from "../../contexts/AuthContext";
import experienceService from "../../management/services/experienceService";
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

// Import Styled Components
import { HeaderContainer, ActionGroup, LocationText } from "./Experience.Style";

const experienceFields = [
  { name: "company", label: "Company", type: "text" },
  { name: "position", label: "Position", type: "text" },
  { name: "start_date", label: "Start Date", type: "date" },
  { name: "end_date", label: "End Date", type: "date" },
  { name: "location", label: "Location", type: "text" },
  { name: "description", label: "Description", type: "text" },
];

const ExperienceTab = () => {
  const { isLoggedIn } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // CMS State
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [overlayMode, setOverlayMode] = useState("create");

  // Confirm State
  const [confirmData, setConfirmData] = useState({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experienceService.getAllExperiences();
        setExperiences(data);
      } catch (err) {
        setError("Failed to load experiences.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleAddClick = () => {
    if (!isLoggedIn) return;
    setOverlayMode("create");
    setEditingItem({});
    setIsOverlayOpen(true);
  };

  const handleEditClick = (item) => {
    if (!isLoggedIn) return;
    setOverlayMode("update");
    setEditingItem(item);
    setIsOverlayOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (!isLoggedIn) return;
    setConfirmData({
      isOpen: true,
      id: id,
    });
  };

  const confirmDelete = async () => {
    const { id } = confirmData;
    try {
      await experienceService.deleteExperience(id);
      setExperiences((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Delete failed.");
    } finally {
      setConfirmData({ isOpen: false, id: null });
    }
  };

  const handleFormSubmit = async (formData, mode) => {
    if (!isLoggedIn) return;

    // Clean data matching fields
    const cleanData = {};
    experienceFields.forEach((f) => (cleanData[f.name] = formData[f.name]));

    try {
      if (mode === "create") {
        const newItem = await experienceService.createExperience(cleanData);
        setExperiences((prev) => [...prev, newItem]);
      } else {
        await experienceService.updateExperience(editingItem.id, cleanData);
        setExperiences((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? { ...item, ...cleanData } : item,
          ),
        );
      }
      setIsOverlayOpen(false);
    } catch (err) {
      setError("Failed to save experience entry.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <TabWrapper>
      <ErrorMessage message={error} onClear={() => setError(null)} />

      <Confirm
        isOpen={confirmData.isOpen}
        message="Are you sure you want to permanently remove this experience?"
        confirmText="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmData({ isOpen: false, id: null })}
      />

      <HeaderContainer>
        <SectionTitle icon={<UilBriefcaseAlt size="28" />}>
          Work Experience
        </SectionTitle>
        {isLoggedIn && (
          <CmsButton
            type="add"
            onClick={handleAddClick}
            style={{ marginLeft: "15px" }}
          />
        )}
      </HeaderContainer>

      {experiences.length === 0 && !error && <p>No experiences found.</p>}

      <GridWrapper>
        {experiences.map((exp) => (
          <Card
            key={exp.id}
            title={exp.position}
            subtitle={exp.company}
            meta={`${formatDate(exp.start_date)} – ${
              formatDate(exp.end_date) || "Present"
            }`}
            description={exp.description}
            extra={
              <div style={{ display: "flex", alignItems: "center" }}>
                <LocationText>{exp.location}</LocationText>

                {isLoggedIn && (
                  <ActionGroup>
                    <CmsButton
                      type="edit"
                      onClick={() => handleEditClick(exp)}
                    />
                    <CmsButton
                      type="delete"
                      onClick={() => handleDeleteClick(exp.id)}
                    />
                  </ActionGroup>
                )}
              </div>
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
        resourceName="experience"
        fields={experienceFields}
      />
      <Footer />
    </TabWrapper>
  );
};

export default ExperienceTab;
