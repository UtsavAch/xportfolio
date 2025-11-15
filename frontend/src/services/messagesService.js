import { api } from "./api";

class MessagesService {
  // Get all messages
  async getAllMessages() {
    const response = await api.get("/messages");
    return response.data;
  }

  // Get a specific message by ID
  async getMessageById(id) {
    const response = await api.get(`/messages/${id}`);
    return response.data;
  }

  // Create a new message (by anyone who visits the website)
  async createMessage(messageData) {
    const response = await api.post(`/messages`, messageData);
    return response.data;
  }

  // Delete a specific message by ID
  async deleteMessage(id) {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  }
}

const messagesService = new MessagesService();
export default messagesService;
