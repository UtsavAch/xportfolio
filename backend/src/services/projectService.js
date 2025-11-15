// services/projectService.js
import projectRepository from "../database/repositories/projectRepository.js";

class ProjectService {
  /**
   * Get all projects
   */
  async getAll() {
    try {
      const list = await projectRepository.getAll();

      return {
        success: true,
        status: 200,
        data: list,
      };
    } catch (error) {
      console.error("ProjectService.getAll Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching projects",
      };
    }
  }

  /**
   * Get a single project by ID
   */
  async getById(id) {
    try {
      const item = await projectRepository.getById(id);

      if (!item) {
        return {
          success: false,
          status: 404,
          error: "Project not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: item,
      };
    } catch (error) {
      console.error("ProjectService.getById Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching project",
      };
    }
  }

  /**
   * Create a new project
   */
  async create(data) {
    try {
      if (!data || !data.title || !data.description) {
        return {
          success: false,
          status: 400,
          error: "title and description are required",
        };
      }

      const created = await projectRepository.create(data);

      return {
        success: true,
        status: 201,
        data: created,
      };
    } catch (error) {
      console.error("ProjectService.create Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while creating project",
      };
    }
  }

  /**
   * Update an existing project
   */
  async update(id, updates) {
    try {
      if (!updates || !updates.title || !updates.description) {
        return {
          success: false,
          status: 400,
          error: "title and description are required",
        };
      }

      const existing = await projectRepository.getById(id);

      if (!existing) {
        return {
          success: false,
          status: 404,
          error: "Project not found",
        };
      }

      const updated = await projectRepository.update(id, updates);

      return {
        success: true,
        status: 200,
        data: updated,
      };
    } catch (error) {
      console.error("ProjectService.update Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while updating project",
      };
    }
  }

  /**
   * Delete a project
   */
  async delete(id) {
    try {
      const deleted = await projectRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          status: 404,
          error: "Project not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: deleted,
      };
    } catch (error) {
      console.error("ProjectService.delete Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while deleting project",
      };
    }
  }
}

export default new ProjectService();
