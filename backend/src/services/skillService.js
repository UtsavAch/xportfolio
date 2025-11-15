// services/skillService.js
import skillRepository from "../database/repositories/skillRepository.js";

class SkillService {
  /**
   * Get all skills
   */
  async getAll() {
    try {
      const list = await skillRepository.getAll();

      return {
        success: true,
        status: 200,
        data: list,
      };
    } catch (error) {
      console.error("SkillService.getAll Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching skills",
      };
    }
  }

  /**
   * Get a single skill by ID
   */
  async getById(id) {
    try {
      const item = await skillRepository.getById(id);

      if (!item) {
        return {
          success: false,
          status: 404,
          error: "Skill not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: item,
      };
    } catch (error) {
      console.error("SkillService.getById Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching skill",
      };
    }
  }

  /**
   * Create a new skill
   */
  async create(data) {
    try {
      if (!data || !data.type || !data.name) {
        return {
          success: false,
          status: 400,
          error: "type and name are required",
        };
      }

      const created = await skillRepository.create(data);

      return {
        success: true,
        status: 201,
        data: created,
      };
    } catch (error) {
      console.error("SkillService.create Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while creating skill",
      };
    }
  }

  /**
   * Update an existing skill
   */
  async update(id, updates) {
    try {
      if (!updates || !updates.type || !updates.name) {
        return {
          success: false,
          status: 400,
          error: "type and name are required",
        };
      }

      const existing = await skillRepository.getById(id);

      if (!existing) {
        return {
          success: false,
          status: 404,
          error: "Skill not found",
        };
      }

      const updated = await skillRepository.update(id, updates);

      return {
        success: true,
        status: 200,
        data: updated,
      };
    } catch (error) {
      console.error("SkillService.update Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while updating skill",
      };
    }
  }

  /**
   * Delete a skill
   */
  async delete(id) {
    try {
      const deleted = await skillRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          status: 404,
          error: "Skill not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: deleted,
      };
    } catch (error) {
      console.error("SkillService.delete Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while deleting skill",
      };
    }
  }
}

export default new SkillService();
