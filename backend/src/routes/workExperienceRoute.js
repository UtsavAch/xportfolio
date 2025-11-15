// routes/workExperienceRoute.js
import express from "express";
import WorkExperienceController from "../controllers/workExperienceController.js";
import { authenticate } from "../services/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", WorkExperienceController.getAll);
router.get("/:id", WorkExperienceController.getById);

// CMS/admin routes: protected
router.post("/", authenticate, WorkExperienceController.create);
router.put("/:id", authenticate, WorkExperienceController.update);
router.delete("/:id", authenticate, WorkExperienceController.delete);

export default router;
