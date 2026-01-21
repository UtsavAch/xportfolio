// routes/profileRoute.js
import express from "express";
import ProfileController from "../controllers/profileController.js";
import { authenticate } from "../auth/authMiddleware.js";
const router = express.Router();
import { profileUploads } from "../storage/uploadMiddleware.js";

// Public routes
router.get("/", ProfileController.getProfile);

// CMS/admin routes: protected
router.put("/", authenticate, profileUploads, ProfileController.updateProfile);

export default router;
