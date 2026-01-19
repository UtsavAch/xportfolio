// controllers/workExperienceController.js
import Joi from "joi";
import workExperienceService from "../services/workExperienceService.js";

// Validation schema for work experience
const workExperienceSchema = Joi.object({
  position: Joi.string().min(1).required(),
  company: Joi.string().min(1).required(),
  location: Joi.string().min(1).required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  description: Joi.string().allow("").optional(),
});

// UUID validation schema for IDs
const uuidSchema = Joi.string()
  .guid({ version: ["uuidv4"] })
  .required();

class WorkExperienceController {
  /**
   * Get all work experiences
   */
  async getAll(req, res, next) {
    try {
      const result = await workExperienceService.getAll();
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get work experience by ID
   */
  async getById(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await workExperienceService.getById(req.params.id);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a new work experience
   */
  async create(req, res, next) {
    try {
      const { error } = workExperienceSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const result = await workExperienceService.create(req.body);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.status(201).json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update a work experience entry
   */
  async update(req, res, next) {
    try {
      const { error: idError } = uuidSchema.validate(req.params.id);
      if (idError)
        return res.status(400).json({ error: "Invalid UUID format" });

      const { error: bodyError } = workExperienceSchema.validate(req.body);
      if (bodyError)
        return res.status(400).json({ error: bodyError.details[0].message });

      const result = await workExperienceService.update(
        req.params.id,
        req.body,
      );
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a work experience entry
   */
  async delete(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await workExperienceService.delete(req.params.id);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json({
        message: "Work experience successfully removed",
        data: result.data,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new WorkExperienceController();
