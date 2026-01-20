// controllers/projectController.js
import Joi from "joi";
import projectService from "../services/projectService.js";

// Validation schema for project
const projectSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  link: Joi.string().uri().allow("").optional(),
  video_url: Joi.string().uri().allow("").optional(),
  github_url: Joi.string().uri().allow("").optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

// UUID validation schema
const uuidSchema = Joi.string()
  .guid({ version: ["uuidv4"] })
  .required();

class ProjectController {
  /**
   * Get all projects
   */
  async getAll(req, res, next) {
    try {
      const result = await projectService.getAll();
      if (!result.success)
        return res.status(result.status).json({ error: result.error });
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get a project by ID
   */
  async getById(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await projectService.getById(req.params.id);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a new project
   */
  async create(req, res, next) {
    try {
      const { error } = projectSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const result = await projectService.create(req.body);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.status(201).json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update a project
   */
  async update(req, res, next) {
    try {
      const { error: idError } = uuidSchema.validate(req.params.id);
      if (idError)
        return res.status(400).json({ error: "Invalid UUID format" });

      const { error: bodyError } = projectSchema.validate(req.body);
      if (bodyError)
        return res.status(400).json({ error: bodyError.details[0].message });

      const result = await projectService.update(req.params.id, req.body);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a project
   */
  async delete(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await projectService.delete(req.params.id);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json({ message: "Project successfully removed", data: result.data });
    } catch (err) {
      next(err);
    }
  }
}

export default new ProjectController();
