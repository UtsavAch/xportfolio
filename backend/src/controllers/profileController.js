// controllers/profileController.js
import Joi from "joi";
import profileService from "../services/profileService.js";
import storageService from "../storage/storageService.js";

// Validation schema for updating profile
const profileSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  title: Joi.string().optional(),
  bio: Joi.string().optional(),
  profile_photo_url: Joi.string().uri().allow("").optional(),
  cv_url: Joi.string().uri().allow("").optional(),
  phone: Joi.string().allow("").optional(),
  whatsapp: Joi.string().allow("").optional(),
  email: Joi.string().email().allow("").optional(),
  linkedin: Joi.string().uri().allow("").optional(),
  github: Joi.string().uri().allow("").optional(),
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
      const updates = { ...req.body };

      // 1. Handle Profile Photo if uploaded
      if (req.files?.profile_photo_file) {
        const photoFile = req.files.profile_photo_file[0];
        updates.profile_photo_url = await storageService.uploadFile(
          photoFile,
          "profiles",
        );
      }

      // 2. Handle CV if uploaded
      if (req.files?.cv_file) {
        const cvFile = req.files.cv_file[0];
        updates.cv_url = await storageService.uploadFile(cvFile, "documents");
      }

      // 3. Remove the internal file objects from the updates object
      // so they don't try to get saved to the database text columns
      delete updates.profile_photo_file;
      delete updates.cv_file;

      // 4. Update the database
      const result = await profileService.updateProfile(updates);

      if (!result.success) {
        return res.status(result.status).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      console.error("Controller Error:", err);
      next(err);
    }
  }
}

export default new ProfileController();
