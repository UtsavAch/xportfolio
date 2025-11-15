// services/courseService.js
import courseRepository from "../database/repositories/courseRepository.js";

class CourseService {
  /**
   * Get all courses
   */
  async getAll() {
    try {
      const list = await courseRepository.getAll();

      return {
        success: true,
        status: 200,
        data: list,
      };
    } catch (error) {
      console.error("CourseService.getAll Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching courses",
      };
    }
  }

  /**
   * Get a single course by ID
   */
  async getById(id) {
    try {
      const item = await courseRepository.getById(id);

      if (!item) {
        return {
          success: false,
          status: 404,
          error: "Course not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: item,
      };
    } catch (error) {
      console.error("CourseService.getById Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching course",
      };
    }
  }

  /**
   * Create a new course
   */
  async create(data) {
    try {
      if (!data || !data.title || !data.start_date || !data.end_date) {
        return {
          success: false,
          status: 400,
          error: "title, start_date, and end_date are required",
        };
      }

      const created = await courseRepository.create(data);

      return {
        success: true,
        status: 201,
        data: created,
      };
    } catch (error) {
      console.error("CourseService.create Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while creating course",
      };
    }
  }

  /**
   * Update an existing course
   */
  async update(id, updates) {
    try {
      if (
        !updates ||
        !updates.title ||
        !updates.start_date ||
        !updates.end_date
      ) {
        return {
          success: false,
          status: 400,
          error: "title, start_date, and end_date are required",
        };
      }

      const existing = await courseRepository.getById(id);

      if (!existing) {
        return {
          success: false,
          status: 404,
          error: "Course not found",
        };
      }

      const updated = await courseRepository.update(id, updates);

      return {
        success: true,
        status: 200,
        data: updated,
      };
    } catch (error) {
      console.error("CourseService.update Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while updating course",
      };
    }
  }

  /**
   * Delete a course
   */
  async delete(id) {
    try {
      const deleted = await courseRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          status: 404,
          error: "Course not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: deleted,
      };
    } catch (error) {
      console.error("CourseService.delete Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while deleting course",
      };
    }
  }
}

export default new CourseService();
