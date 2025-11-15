// controllers/profileController.js
import Joi from "joi";
import profileService from "../services/profileService.js";

// Validation schema for updating profile
const profileSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  title: Joi.string().optional(),
  bio: Joi.string().optional(),
  profile_photo_url: Joi.string().uri().allow("").optional(),
  cv_url: Joi.string().uri().allow("").optional(),
  phone: Joi.string().allow("").optional(),
  whatsapp: Joi.string().allow("").optional(),
  location: Joi.string().allow("").optional(),
});

class ProfileController {
  /**
   * Get profile
   */
  async getProfile(req, res, next) {
    try {
      const result = await profileService.getProfile();
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }
      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update profile
   */
  async updateProfile(req, res, next) {
    try {
      const { error } = profileSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const updates = { ...req.body };

      const result = await profileService.updateProfile(updates);
      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProfileController();
