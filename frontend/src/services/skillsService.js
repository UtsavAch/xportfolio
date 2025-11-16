// services/skillsService.js
import { api } from "./api";

class SkillsService {
  // Get all skills (public)
  async getAllSkills() {
    const response = await api.get("/skills");
    return response.data;
  }

  // Get a specific skill by ID (public)
  async getSkillById(id) {
    const response = await api.get(`/skills/${id}`);
    return response.data;
  }

  // Create a new skill (CMS/admin - protected)
  async createSkill(skillData) {
    const response = await api.post("/skills", skillData);
    return response.data;
  }

  // Update an existing skill (CMS/admin - protected)
  async updateSkill(id, skillData) {
    const response = await api.put(`/skills/${id}`, skillData);
    return response.data;
  }

  // Delete a skill (CMS/admin - protected)
  async deleteSkill(id) {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
  }
}

const skillsService = new SkillsService();
export default skillsService;
