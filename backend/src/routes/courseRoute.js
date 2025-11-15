// routes/courseRoute.js
import express from "express";
import CourseController from "../controllers/courseController.js";
import { authenticate } from "../auth/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", CourseController.getAll);
router.get("/:id", CourseController.getById);

// CMS/admin routes: protected
router.post("/", authenticate, CourseController.create);
router.put("/:id", authenticate, CourseController.update);
router.delete("/:id", authenticate, CourseController.delete);

export default router;
