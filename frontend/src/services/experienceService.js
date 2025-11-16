// services/experienceService.js
import { api } from "./api";

class ExperienceService {
  // Get all experiences (public)
  async getAllExperiences() {
    const response = await api.get("/work-experience");
    return response.data;
  }

  // Get a specific experience by ID (public)
  async getExperienceById(id) {
    const response = await api.get(`/work-experience/${id}`);
    return response.data;
  }

  // Create a new experience (CMS/admin - protected)
  async createExperience(experienceData) {
    const response = await api.post("/work-experience", experienceData);
    return response.data;
  }

  // Update an existing experience (CMS/admin - protected)
  async updateExperience(id, experienceData) {
    const response = await api.put(`/work-experience/${id}`, experienceData);
    return response.data;
  }

  // Delete an experience (CMS/admin - protected)
  async deleteExperience(id) {
    const response = await api.delete(`/work-experience/${id}`);
    return response.data;
  }
}

const experienceService = new ExperienceService();
export default experienceService;
