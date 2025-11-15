import profileRepository from "../database/repositories/profileRepository.js";

class ProfileService {
  /**
   * Fetch the profile
   */
  async getProfile() {
    try {
      const profile = await profileRepository.getProfile();

      if (!profile) {
        return {
          success: false,
          status: 404,
          error: "Profile not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: profile,
      };
    } catch (error) {
      console.error("ProfileService.getProfile Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching profile",
      };
    }
  }

  /**
   * Update the profile
   */
  async updateProfile(updates) {
    try {
      // Basic validation (optional but recommended)
      if (!updates || typeof updates !== "object") {
        return {
          success: false,
          status: 400,
          error: "Invalid updates payload",
        };
      }

      const updatedProfile = await profileRepository.updateProfile(updates);

      if (!updatedProfile) {
        return {
          success: false,
          status: 404,
          error: "Profile not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: updatedProfile,
      };
    } catch (error) {
      console.error("ProfileService.updateProfile Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while updating profile",
      };
    }
  }
}

export default new ProfileService();
