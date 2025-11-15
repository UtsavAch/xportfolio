// services/contactMessageService.js
import contactMessageRepository from "../database/repositories/contactMessageRepository.js";

class ContactMessageService {
  /**
   * Get all contact messages
   */
  async getAll() {
    try {
      const list = await contactMessageRepository.getAll();

      return {
        success: true,
        status: 200,
        data: list,
      };
    } catch (error) {
      console.error("ContactMessageService.getAll Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching contact messages",
      };
    }
  }

  /**
   * Get a single contact message by ID
   */
  async getById(id) {
    try {
      const message = await contactMessageRepository.getById(id);

      if (!message) {
        return {
          success: false,
          status: 404,
          error: "Contact message not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: message,
      };
    } catch (error) {
      console.error("ContactMessageService.getById Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while fetching contact message",
      };
    }
  }

  /**
   * Create a new contact message
   */
  async create(data) {
    try {
      if (!data || !data.sender_name || !data.sender_email || !data.message) {
        return {
          success: false,
          status: 400,
          error: "sender_name, sender_email, and message are required",
        };
      }

      const created = await contactMessageRepository.create(data);

      return {
        success: true,
        status: 201,
        data: created,
      };
    } catch (error) {
      console.error("ContactMessageService.create Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while creating contact message",
      };
    }
  }

  /**
   * Mark a contact message as read
   */
  async markAsRead(id) {
    try {
      const updated = await contactMessageRepository.markAsRead(id);

      if (!updated) {
        return {
          success: false,
          status: 404,
          error: "Contact message not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: updated,
      };
    } catch (error) {
      console.error("ContactMessageService.markAsRead Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while marking message as read",
      };
    }
  }

  /**
   * Delete a contact message
   */
  async delete(id) {
    try {
      const deleted = await contactMessageRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          status: 404,
          error: "Contact message not found",
        };
      }

      return {
        success: true,
        status: 200,
        data: deleted,
      };
    } catch (error) {
      console.error("ContactMessageService.delete Error:", error);

      return {
        success: false,
        status: 500,
        error: "Internal server error while deleting contact message",
      };
    }
  }
}

export default new ContactMessageService();
