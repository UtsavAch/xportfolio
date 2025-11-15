// controllers/contactMessageController.js
import Joi from "joi";
import contactMessageService from "../services/contactMessageService.js";

// Validation schema for creating a contact message
const contactMessageSchema = Joi.object({
  sender_name: Joi.string().min(1).required(),
  sender_email: Joi.string().email().required(),
  sender_linkedin: Joi.string().uri().allow("").optional(),
  message: Joi.string().min(1).required(),
});

// UUID validation schema
const uuidSchema = Joi.string()
  .guid({ version: ["uuidv4"] })
  .required();

class ContactMessageController {
  /**
   * Get all contact messages
   */
  async getAll(req, res, next) {
    try {
      const result = await contactMessageService.getAll();
      if (!result.success)
        return res.status(result.status).json({ error: result.error });
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get a single contact message by ID
   */
  async getById(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await contactMessageService.getById(req.params.id);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a new contact message
   */
  async create(req, res, next) {
    try {
      const { error } = contactMessageSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const result = await contactMessageService.create(req.body);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.status(201).json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Mark a contact message as read
   */
  async markAsRead(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await contactMessageService.markAsRead(req.params.id);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a contact message
   */
  async delete(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await contactMessageService.delete(req.params.id);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json({
        message: "Contact message successfully deleted",
        data: result.data,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ContactMessageController();
