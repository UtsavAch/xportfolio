// src/services/messagesService.js
import messagesRepository from "../database/repositories/messagesRepository.js";

class MessagesService {
  // Fetch all messages
  async getAllMessages() {
    try {
      const messages = await messagesRepository.getAllMessages();
      return { success: true, data: messages };
    } catch (error) {
      console.error("Error fetching messages:", error);
      return { success: false, error: "Failed to fetch messages" };
    }
  }

  // Fetch a single message by ID
  async getMessageById(id) {
    try {
      const message = await messagesRepository.getMessageById(id);
      if (!message) return { success: false, error: "Message not found" };
      return { success: true, data: message };
    } catch (error) {
      console.error(`Error fetching message ${id}:`, error);
      return { success: false, error: "Failed to fetch message" };
    }
  }

  // Create a new message
  async createMessage(messageData) {
    try {
      const newMessage = await messagesRepository.createMessage(messageData);
      return { success: true, data: newMessage };
    } catch (error) {
      console.error("Error creating message:", error);
      return { success: false, error: "Failed to create message" };
    }
  }

  // Delete a message by ID
  async deleteMessage(id) {
    try {
      const deletedMessage = await messagesRepository.deleteMessage(id);
      if (!deletedMessage)
        return { success: false, error: "Message not found" };
      return { success: true, data: deletedMessage };
    } catch (error) {
      console.error(`Error deleting message ${id}:`, error);
      return { success: false, error: "Failed to delete message" };
    }
  }
}

export default new MessagesService();
