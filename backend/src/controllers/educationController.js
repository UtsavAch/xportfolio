// controllers/educationController.js
import Joi from "joi";
import educationService from "../services/educationService.js";

// Validation schema for education
const educationSchema = Joi.object({
  degree: Joi.string().min(1).required(),
  university: Joi.string().min(1).required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  description: Joi.string().allow("").optional(),
});

// UUID validation schema for IDs
const uuidSchema = Joi.string()
  .guid({ version: ["uuidv4"] })
  .required();

class EducationController {
  /**
   * Get all education entries
   */
  async getAll(req, res, next) {
    try {
      const result = await educationService.getAll();
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get education entry by ID
   */
  async getById(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await educationService.getById(req.params.id);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a new education entry
   */
  async create(req, res, next) {
    try {
      const { error } = educationSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const result = await educationService.create(req.body);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.status(201).json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update an education entry
   */
  async update(req, res, next) {
    try {
      const { error: idError } = uuidSchema.validate(req.params.id);
      if (idError)
        return res.status(400).json({ error: "Invalid UUID format" });

      const { error: bodyError } = educationSchema.validate(req.body);
      if (bodyError)
        return res.status(400).json({ error: bodyError.details[0].message });

      const result = await educationService.update(req.params.id, req.body);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete an education entry
   */
  async delete(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await educationService.delete(req.params.id);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json({
        message: "Education entry successfully removed",
        data: result.data,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new EducationController();
