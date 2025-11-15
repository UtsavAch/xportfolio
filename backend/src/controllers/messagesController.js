// src/controllers/messagesController.js
import Joi from "joi";
import messagesService from "../services/messagesService.js";

// Validation schema for message creation
const messageSchema = Joi.object({
  sms_name: Joi.string().min(2).required(),
  sms_email: Joi.string().email().required(),
  sms_text: Joi.string().min(1).max(1000).required(),
});

// UUID validation
const uuidSchema = Joi.string()
  .guid({ version: ["uuidv4"] })
  .required();

class MessagesController {
  // Get all messages
  async getAllMessages(req, res, next) {
    try {
      const result = await messagesService.getAllMessages();
      if (!result.success) {
        return res.status(500).json({ error: result.error });
      }
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  // Get single message by ID
  async getMessageById(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await messagesService.getMessageById(req.params.id);
      if (!result.success) {
        return res.status(404).json({ error: result.error });
      }
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  // Create new message (no auth required)
  async createMessage(req, res, next) {
    try {
      const { error } = messageSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const message = {
        sms_name: req.body.sms_name,
        sms_email: req.body.sms_email,
        sms_text: req.body.sms_text,
      };

      const result = await messagesService.createMessage(message);
      if (!result.success) {
        return res.status(500).json({ error: result.error });
      }

      res.status(201).json(result.data);
    } catch (err) {
      next(err);
    }
  }

  // Delete a message by ID
  async deleteMessage(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await messagesService.deleteMessage(req.params.id);
      if (!result.success) {
        if (result.error === "Message not found") {
          return res.status(404).json({ error: result.error });
        }
        return res.status(500).json({ error: result.error });
      }

      res.json({ message: "Message successfully removed", data: result.data });
    } catch (err) {
      next(err);
    }
  }
}

export default new MessagesController();
