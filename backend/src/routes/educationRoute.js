// routes/educationRoute.js
import express from "express";
import EducationController from "../controllers/educationController.js";
import { authenticate } from "../auth/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", EducationController.getAll);
router.get("/:id", EducationController.getById);

// CMS/admin routes: protected
router.post("/", authenticate, EducationController.create);
router.put("/:id", authenticate, EducationController.update);
router.delete("/:id", authenticate, EducationController.delete);

export default router;
