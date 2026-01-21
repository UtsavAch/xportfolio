import { useEffect, useState } from "react";

import { UilCodeBranch } from "@iconscout/react-unicons";

import { useAuth } from "../../contexts/AuthContext";
import projectsService from "../../services/projectsService";
import Card from "../../components/card/Card.Component";
import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";
import CmsOverlay from "../../components/cmsoverlay/CmsOverlay.component";
import CmsButton from "../../components/cmsbutton/CmsButton.Component";
import ErrorMessage from "../../components/error/Error.Component";
import Confirm from "../../components/confirm/Confirm.Component";
import SectionTitle from "../../components/sectiontitle/SectionTitle.Component";
import Footer from "../../components/footer/Footer.Component";
import GridWrapper from "../../components/gridwrapper/GridWrapper.Component";
import Spinner from "../../components/spinner/Spinner.Component";

// Import Styled Components
import { HeaderContainer, ActionGroup } from "./Projects.Style";

const projectFields = [
  { name: "title", label: "Project Title", type: "text" },
  { name: "link", label: "Project Link", type: "text" },
  { name: "video_url", label: "Video URL", type: "text" },
  { name: "github_url", label: "GitHub URL", type: "text" },
  { name: "tags", label: "Tags (comma separated)", type: "text" },
  { name: "description", label: "Description", type: "text" }, // or "textarea" if your CmsOverlay supports it
];

const ProjectsTab = () => {
  const { isLoggedIn } = useAuth();
  const [projects, setProjects] = useState([]);
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
    const fetchProjects = async () => {
      try {
        const data = await projectsService.getAllProjects();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleAddClick = () => {
    if (!isLoggedIn) return;
    setOverlayMode("create");
    setEditingItem({});
    setIsOverlayOpen(true);
  };

  // Converts the array ["tag1", "tag2"] -> string "tag1, tag2" for the input field
  const handleEditClick = (item) => {
    if (!isLoggedIn) return;
    setOverlayMode("update");
    const itemToEdit = { ...item };

    if (Array.isArray(itemToEdit.tags)) {
      itemToEdit.tags = itemToEdit.tags.join(", ");
    }

    setEditingItem(itemToEdit);
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
      await projectsService.deleteProject(id);
      setProjects((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Delete failed.");
    } finally {
      setConfirmData({ isOpen: false, id: null });
    }
  };

  // Converts the string "tag1, tag2" -> array ["tag1", "tag2"] for the backend
  const handleFormSubmit = async (formData, mode) => {
    if (!isLoggedIn) return;

    const cleanData = {};
    projectFields.forEach((f) => (cleanData[f.name] = formData[f.name]));

    if (typeof cleanData.tags === "string") {
      cleanData.tags = cleanData.tags
        .split(",") // Split by comma
        .map((tag) => tag.trim()) // Remove whitespace around words
        .filter((tag) => tag !== ""); // Remove empty entries
    }

    try {
      if (mode === "create") {
        const newItem = await projectsService.createProject(cleanData);
        setProjects((prev) => [...prev, newItem]);
      } else {
        await projectsService.updateProject(editingItem.id, cleanData);
        setProjects((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? { ...item, ...cleanData } : item,
          ),
        );
      }
      setIsOverlayOpen(false);
    } catch (err) {
      setError("Failed to save project.");
    }
  };

  if (loading) {
    return (
      <TabWrapper>
        <Spinner message="Loading projects..." />
      </TabWrapper>
    );
  }

  return (
    <TabWrapper>
      <ErrorMessage message={error} onClear={() => setError(null)} />

      <Confirm
        isOpen={confirmData.isOpen}
        message="Are you sure you want to permanently remove this project?"
        confirmText="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmData({ isOpen: false, id: null })}
      />

      <HeaderContainer>
        <SectionTitle icon={<UilCodeBranch size="28" />}>Projects</SectionTitle>
        {isLoggedIn && (
          <CmsButton
            type="add"
            onClick={handleAddClick}
            style={{ marginLeft: "15px" }}
          />
        )}
      </HeaderContainer>

      {projects.length === 0 && !error && <p>No projects found.</p>}

      <GridWrapper>
        {projects.map((project) => (
          <Card
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            links={{
              url: project.link,
              github: project.github_url,
              video: project.video_url,
            }}
            extra={
              <ActionGroup $gap="15px">
                {isLoggedIn && (
                  <>
                    <CmsButton
                      type="edit"
                      onClick={() => handleEditClick(project)}
                    />
                    <CmsButton
                      type="delete"
                      onClick={() => handleDeleteClick(project.id)}
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
        resourceName="project"
        fields={projectFields}
      />
      <Footer />
    </TabWrapper>
  );
};

export default ProjectsTab;
