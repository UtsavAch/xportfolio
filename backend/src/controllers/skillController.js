// controllers/skillController.js
import Joi from "joi";
import skillService from "../services/skillService.js";

// Validation schema for skill
const skillSchema = Joi.object({
  type: Joi.string().min(1).required(),
  name: Joi.string().min(1).required(),
});

// UUID validation schema
const uuidSchema = Joi.string()
  .guid({ version: ["uuidv4"] })
  .required();

class SkillController {
  /**
   * Get all skills
   */
  async getAll(req, res, next) {
    try {
      const result = await skillService.getAll();
      if (!result.success)
        return res.status(result.status).json({ error: result.error });
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get a skill by ID
   */
  async getById(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await skillService.getById(req.params.id);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a new skill
   */
  async create(req, res, next) {
    try {
      const { error } = skillSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const result = await skillService.create(req.body);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.status(201).json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update a skill
   */
  async update(req, res, next) {
    try {
      const { error: idError } = uuidSchema.validate(req.params.id);
      if (idError)
        return res.status(400).json({ error: "Invalid UUID format" });

      const { error: bodyError } = skillSchema.validate(req.body);
      if (bodyError)
        return res.status(400).json({ error: bodyError.details[0].message });

      const result = await skillService.update(req.params.id, req.body);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a skill
   */
  async delete(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await skillService.delete(req.params.id);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json({ message: "Skill successfully removed", data: result.data });
    } catch (err) {
      next(err);
    }
  }
}

export default new SkillController();
