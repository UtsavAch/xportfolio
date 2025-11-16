// services/messageService.js
import { api } from "./api";

class MessagesService {
  // Create a new contact message (public)
  async sendMessage(messageData) {
    const response = await api.post("/contact-messages", messageData);
    return response.data;
  }

  // Get all messages (CMS/admin - protected)
  async getAllMessages() {
    const response = await api.get("/contact-messages");
    return response.data;
  }

  // Get a message by ID (CMS/admin - protected)
  async getMessageById(id) {
    const response = await api.get(`/contact-messages/${id}`);
    return response.data;
  }

  // Mark message as read (CMS/admin - protected)
  async markMessageAsRead(id) {
    const response = await api.put(`/contact-messages/${id}/read`);
    return response.data;
  }

  // Delete a message (CMS/admin - protected)
  async deleteMessage(id) {
    const response = await api.delete(`/contact-messages/${id}`);
    return response.data;
  }
}

const messagesService = new MessagesService();
export default messagesService;
