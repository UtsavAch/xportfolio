// routes/profileRoute.js
import express from "express";
import ProfileController from "../controllers/profileController.js";
import { authenticate } from "../auth/authMiddleware.js";
const router = express.Router();

// Public routes
router.get("/", ProfileController.getProfile);

// CMS/admin routes: protected
router.put("/", authenticate, ProfileController.updateProfile);

export default router;
