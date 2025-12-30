import { useEffect, useState } from "react";
import projectsService from "../../management/services/projectsService";
import Card from "../../components/card/Card.Component";
import TabWrapper from "../../components/tabwrapper/TabWrapper.Component";

const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsService.getAllProjects();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;
  if (projects.length === 0) return <p>No projects found</p>;

  return (
    <TabWrapper>
      <h1>Projects</h1>

      {projects.map((project) => (
        <Card
          key={project.id}
          title={project.title}
          description={project.description}
          extra={
            project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            )
          }
        >
          {project.video_url && (
            <p>
              <strong>Video:</strong>{" "}
              <a
                href={project.video_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch demo
              </a>
            </p>
          )}
        </Card>
      ))}
    </TabWrapper>
  );
};

export default ProjectsTab;
