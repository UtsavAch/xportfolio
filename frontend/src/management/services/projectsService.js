// services/projectService.js
import { api } from "./api";

class ProjectService {
  // Get all projects (public)
  async getAllProjects() {
    const response = await api.get("/projects");
    return response.data;
  }

  // Get a specific project by ID (public)
  async getProjectById(id) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  }

  // Create a new project (CMS/admin - protected)
  async createProject(projectData) {
    const response = await api.post("/projects", projectData);
    return response.data;
  }

  // Update an existing project (CMS/admin - protected)
  async updateProject(id, projectData) {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  }

  // Delete a project (CMS/admin - protected)
  async deleteProject(id) {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  }
}

const projectService = new ProjectService();
export default projectService;
