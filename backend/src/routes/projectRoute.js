// routes/projectRoute.js
import express from "express";
import ProjectController from "../controllers/projectController.js";
import { authenticate } from "../auth/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", ProjectController.getAll);
router.get("/:id", ProjectController.getById);

// CMS/admin routes: protected
router.post("/", authenticate, ProjectController.create);
router.put("/:id", authenticate, ProjectController.update);
router.delete("/:id", authenticate, ProjectController.delete);

export default router;
