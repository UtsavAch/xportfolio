// services/educationService.js
import educationRepository from "../database/repositories/educationRepository.js";

class EducationService {
  /**
   * Get all education entries
   */
  async getAll() {
    try {
      const list = await educationRepository.getAll();

      return {
        success: true,
        status: 200,
        data: list,
      };
    } catch (error) {
      console.error("EducationService.getAll Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching education entries",
      };
    }
  }

  /**
   * Get a single education entry by ID
   */
  async getById(id) {
    try {
      const item = await educationRepository.getById(id);

      if (!item) {
        return {
          success: false,
          status: 404,
          error: "Education entry not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: item,
      };
    } catch (error) {
      console.error("EducationService.getById Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching education entry",
      };
    }
  }

  /**
   * Create a new education entry
   */
  async create(data) {
    try {
      if (
        !data ||
        !data.degree ||
        !data.university ||
        !data.location ||
        !data.start_date
      ) {
        return {
          success: false,
          status: 400,
          error: "degree, university, location and start_date are required",
        };
      }

      const created = await educationRepository.create(data);

      return {
        success: true,
        status: 201,
        data: created,
      };
    } catch (error) {
      console.error("EducationService.create Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while creating education entry",
      };
    }
  }

  /**
   * Update an existing education entry
   */
  async update(id, updates) {
    try {
      if (
        !updates ||
        !updates.degree ||
        !updates.university ||
        !updates.location ||
        !updates.start_date
      ) {
        return {
          success: false,
          status: 400,
          error: "degree, university, location and start_date are required",
        };
      }

      const existing = await educationRepository.getById(id);

      if (!existing) {
        return {
          success: false,
          status: 404,
          error: "Education entry not found",
        };
      }

      const updated = await educationRepository.update(id, updates);

      return {
        success: true,
        status: 200,
        data: updated,
      };
    } catch (error) {
      console.error("EducationService.update Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while updating education entry",
      };
    }
  }

  /**
   * Delete an education entry
   */
  async delete(id) {
    try {
      const deleted = await educationRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          status: 404,
          error: "Education entry not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: deleted,
      };
    } catch (error) {
      console.error("EducationService.delete Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while deleting education entry",
      };
    }
  }
}

export default new EducationService();
