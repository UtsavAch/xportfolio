// services/educationService.js
import { api } from "./api";

class EducationService {
  // Get all education entries (public)
  async getAllEducation() {
    const response = await api.get("/education");
    return response.data;
  }

  // Get a specific education entry by ID (public)
  async getEducationById(id) {
    const response = await api.get(`/education/${id}`);
    return response.data;
  }

  // Create a new education entry (CMS/admin - protected)
  async createEducation(educationData) {
    const response = await api.post("/education", educationData);
    return response.data;
  }

  // Update an existing education entry (CMS/admin - protected)
  async updateEducation(id, educationData) {
    const response = await api.put(`/education/${id}`, educationData);
    return response.data;
  }

  // Delete an education entry (CMS/admin - protected)
  async deleteEducation(id) {
    const response = await api.delete(`/education/${id}`);
    return response.data;
  }
}

const educationService = new EducationService();
export default educationService;
