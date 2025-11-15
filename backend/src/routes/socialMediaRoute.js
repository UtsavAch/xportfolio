// routes/socialMediaRoute.js
import express from "express";
import SocialMediaController from "../controllers/socialMediaController.js";
import { authenticate } from "../auth/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", SocialMediaController.getAll);
router.get("/:id", SocialMediaController.getById);

// CMS/admin routes: protected
router.post("/", authenticate, SocialMediaController.create);
router.put("/:id", authenticate, SocialMediaController.update);
router.delete("/:id", authenticate, SocialMediaController.delete);

export default router;
