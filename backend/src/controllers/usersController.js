import Joi from "joi";
import usersService from "../services/usersService.js";

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  profile_url: Joi.string().uri().allow("").optional(),
});

const uuidSchema = Joi.string()
  .guid({ version: ["uuidv4"] })
  .required();

class UsersController {
  async getAllUsers(req, res, next) {
    try {
      const result = await usersService.getAllUsers();
      if (!result.success) {
        return res.status(500).json({ error: result.error });
      }
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await usersService.getUserById(req.params.id);
      if (!result.success) {
        return res.status(404).json({ error: result.error });
      }
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const user = {
        username: req.body.username,
        password: req.body.password, // ⚠️ hash before saving
        email: req.body.email,
        profile_url: req.body.profile_url,
      };

      const result = await usersService.createUser(user);
      if (!result.success) {
        return res.status(500).json({ error: result.error });
      }

      res.status(201).json(result.data);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { error: idError } = uuidSchema.validate(req.params.id);
      if (idError)
        return res.status(400).json({ error: "Invalid UUID format" });

      const { error: bodyError } = userSchema.validate(req.body);
      if (bodyError) {
        return res.status(400).json({ error: bodyError.details[0].message });
      }

      const updates = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        profile_url: req.body.profile_url,
      };

      const result = await usersService.updateUser(req.params.id, updates);
      if (!result.success) {
        if (result.error === "User not found") {
          return res.status(404).json({ error: result.error });
        }
        return res.status(500).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { error } = uuidSchema.validate(req.params.id);
      if (error) return res.status(400).json({ error: "Invalid UUID format" });

      const result = await usersService.deleteUser(req.params.id);
      if (!result.success) {
        if (result.error === "User not found") {
          return res.status(404).json({ error: result.error });
        }
        return res.status(500).json({ error: result.error });
      }

      res.json({ message: "User successfully removed", data: result.data });
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
