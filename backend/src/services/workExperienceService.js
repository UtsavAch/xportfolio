// services/workExperienceService.js
import workExperienceRepository from "../database/repositories/workExperienceRepository.js";

class WorkExperienceService {
  /**
   * Get all work experiences
   */
  async getAll() {
    try {
      const list = await workExperienceRepository.getAll();

      return {
        success: true,
        status: 200,
        data: list,
      };
    } catch (error) {
      console.error("WorkExperienceService.getAll Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching work experiences",
      };
    }
  }

  /**
   * Get a single work experience by ID
   */
  async getById(id) {
    try {
      const item = await workExperienceRepository.getById(id);

      if (!item) {
        return {
          success: false,
          status: 404,
          error: "Work experience not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: item,
      };
    } catch (error) {
      console.error("WorkExperienceService.getById Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching work experience",
      };
    }
  }

  /**
   * Create a new work experience
   */
  async create(data) {
    try {
      if (
        !data ||
        !data.position ||
        !data.company ||
        !data.location ||
        !data.start_date
      ) {
        return {
          success: false,
          status: 400,
          error: "position, company, location, and start_date are required",
        };
      }

      const created = await workExperienceRepository.create(data);

      return {
        success: true,
        status: 201,
        data: created,
      };
    } catch (error) {
      console.error("WorkExperienceService.create Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while creating work experience",
      };
    }
  }

  /**
   * Update an existing work experience
   */
  async update(id, updates) {
    try {
      if (
        !updates ||
        !updates.position ||
        !updates.company ||
        !updates.location ||
        !updates.start_date
      ) {
        return {
          success: false,
          status: 400,
          error: "position, company, location, and start_date are required",
        };
      }

      const existing = await workExperienceRepository.getById(id);

      if (!existing) {
        return {
          success: false,
          status: 404,
          error: "Work experience not found",
        };
      }

      const updated = await workExperienceRepository.update(id, updates);

      return {
        success: true,
        status: 200,
        data: updated,
      };
    } catch (error) {
      console.error("WorkExperienceService.update Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while updating work experience",
      };
    }
  }

  /**
   * Delete a work experience
   */
  async delete(id) {
    try {
      const deleted = await workExperienceRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          status: 404,
          error: "Work experience not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: deleted,
      };
    } catch (error) {
      console.error("WorkExperienceService.delete Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while deleting work experience",
      };
    }
  }
}

export default new WorkExperienceService();
