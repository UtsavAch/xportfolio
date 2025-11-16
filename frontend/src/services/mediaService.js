// services/mediaService.js
import { api } from "./api";

class MediaService {
  // Get all social media entries (public)
  async getAllMedia() {
    const response = await api.get("/social-media");
    return response.data;
  }

  // Get a specific social media entry by ID (public)
  async getMediaById(id) {
    const response = await api.get(`/social-media/${id}`);
    return response.data;
  }

  // Create a new social media entry (CMS/admin - protected)
  async createMedia(mediaData) {
    const response = await api.post("/social-media", mediaData);
    return response.data;
  }

  // Update an existing social media entry (CMS/admin - protected)
  async updateMedia(id, mediaData) {
    const response = await api.put(`/social-media/${id}`, mediaData);
    return response.data;
  }

  // Delete a social media entry (CMS/admin - protected)
  async deleteMedia(id) {
    const response = await api.delete(`/social-media/${id}`);
    return response.data;
  }
}

const mediaService = new MediaService();
export default mediaService;
