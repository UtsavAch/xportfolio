// controllers/courseController.js
import Joi from "joi";
import courseService from "../services/courseService.js";

// Validation schema for course
const courseSchema = Joi.object({
  title: Joi.string().min(1).required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().allow(null).optional(),
  link: Joi.string().uri().allow("").optional(),
  description: Joi.string().allow("").optional(),
});

// UUID validation schema
const uuidSchema = Joi.string()
  .guid({ version: ["uuidv4"] })
  .required();

class CourseController {
  /**
   * Get all courses
   */
  async getAll(req, res, next) {
    try {
      const result = await courseService.getAll();
      if (!result.success)
        return res.status(result.status).json({ error: result.error });
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get a course by ID
   */
  async getById(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await courseService.getById(req.params.id);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a new course
   */
  async create(req, res, next) {
    try {
      const { error } = courseSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const result = await courseService.create(req.body);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.status(201).json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update a course
   */
  async update(req, res, next) {
    try {
      const { error: idError } = uuidSchema.validate(req.params.id);
      if (idError)
        return res.status(400).json({ error: "Invalid UUID format" });

      const { error: bodyError } = courseSchema.validate(req.body);
      if (bodyError)
        return res.status(400).json({ error: bodyError.details[0].message });

      const result = await courseService.update(req.params.id, req.body);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a course
   */
  async delete(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await courseService.delete(req.params.id);
      if (!result.success)
        return res.status(result.status).json({ error: result.error });

      res.json({ message: "Course successfully removed", data: result.data });
    } catch (err) {
      next(err);
    }
  }
}

export default new CourseController();
