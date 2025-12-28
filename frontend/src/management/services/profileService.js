// services/profileService.js
import { api } from "./api";

class ProfileService {
  // Get the profile (public)
  async getProfile() {
    const response = await api.get("/profile");
    return response.data;
  }

  // Update the profile (CMS/admin - protected)
  async updateProfile(profileData) {
    const response = await api.put("/profile", profileData);
    return response.data;
  }
}

const profileService = new ProfileService();
export default profileService;
