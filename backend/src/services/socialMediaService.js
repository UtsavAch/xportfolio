// services/socialMediaService.js
import socialMediaRepository from "../database/repositories/socialMediaRepository.js";

class SocialMediaService {
  /**
   * Get all social media links
   */
  async getAll() {
    try {
      const socialMedias = await socialMediaRepository.getAll();

      return {
        success: true,
        status: 200,
        data: socialMedias,
      };
    } catch (error) {
      console.error("SocialMediaService.getAll Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching social media links",
      };
    }
  }

  /**
   * Get a social media link by ID
   */
  async getById(id) {
    try {
      const socialMedia = await socialMediaRepository.getById(id);

      if (!socialMedia) {
        return {
          success: false,
          status: 404,
          error: "Social media entry not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: socialMedia,
      };
    } catch (error) {
      console.error("SocialMediaService.getById Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching social media entry",
      };
    }
  }

  /**
   * Create a new social media link
   */
  async create(data) {
    try {
      if (!data || !data.icon || !data.url) {
        return {
          success: false,
          status: 400,
          error: "Icon and URL are required",
        };
      }

      const created = await socialMediaRepository.create(data);

      return {
        success: true,
        status: 201,
        data: created,
      };
    } catch (error) {
      console.error("SocialMediaService.create Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while creating social media link",
      };
    }
  }

  /**
   * Update an existing social media link
   */
  async update(id, updates) {
    try {
      if (!updates || !updates.icon || !updates.url) {
        return {
          success: false,
          status: 400,
          error: "Icon and URL are required",
        };
      }

      const existing = await socialMediaRepository.getById(id);

      if (!existing) {
        return {
          success: false,
          status: 404,
          error: "Social media entry not found",
        };
      }

      const updated = await socialMediaRepository.update(id, updates);

      return {
        success: true,
        status: 200,
        data: updated,
      };
    } catch (error) {
      console.error("SocialMediaService.update Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while updating social media link",
      };
    }
  }

  /**
   * Delete a social media link
   */
  async delete(id) {
    try {
      const deleted = await socialMediaRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          status: 404,
          error: "Social media entry not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: deleted,
      };
    } catch (error) {
      console.error("SocialMediaService.delete Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while deleting social media link",
      };
    }
  }
}

export default new SocialMediaService();
