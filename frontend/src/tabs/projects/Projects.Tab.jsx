import { useEffect, useState } from "react";
import projectsService from "../../management/services/projectsService";
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
    <section className="projects-tab">
      <h1>Projects</h1>
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <h2>{project.title}</h2>
          <p>
            <strong>Link:</strong> {project.link}
          </p>
          <p>
            <strong>Description:</strong> {project.description}
          </p>
          <p>
            <strong>Video URL:</strong> {project.video_url}
          </p>
        </div>
      ))}
    </section>
  );
};

export default ProjectsTab;
