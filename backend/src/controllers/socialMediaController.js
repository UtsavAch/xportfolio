// controllers/socialMediaController.js
import Joi from "joi";
import socialMediaService from "../services/socialMediaService.js";

// Validation schema for social media
const socialMediaSchema = Joi.object({
  icon: Joi.string().min(1).required(),
  url: Joi.string().uri().required(),
});

// UUID validation schema for IDs
const uuidSchema = Joi.string()
  .guid({ version: ["uuidv4"] })
  .required();

class SocialMediaController {
  /**
   * Get all social media links
   */
  async getAll(req, res, next) {
    try {
      const result = await socialMediaService.getAll();
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get social media by ID
   */
  async getById(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await socialMediaService.getById(req.params.id);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a new social media link
   */
  async create(req, res, next) {
    try {
      const { error } = socialMediaSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const result = await socialMediaService.create(req.body);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.status(201).json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update a social media link
   */
  async update(req, res, next) {
    try {
      const { error: idError } = uuidSchema.validate(req.params.id);
      if (idError)
        return res.status(400).json({ error: "Invalid UUID format" });

      const { error: bodyError } = socialMediaSchema.validate(req.body);
      if (bodyError)
        return res.status(400).json({ error: bodyError.details[0].message });

      const result = await socialMediaService.update(req.params.id, req.body);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a social media link
   */
  async delete(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await socialMediaService.delete(req.params.id);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json({
        message: "Social media link successfully removed",
        data: result.data,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new SocialMediaController();
