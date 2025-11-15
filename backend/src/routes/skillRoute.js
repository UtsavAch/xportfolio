// routes/skillRoute.js
import express from "express";
import SkillController from "../controllers/skillController.js";
import { authenticate } from "../services/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", SkillController.getAll);
router.get("/:id", SkillController.getById);

// CMS/admin routes: protected
router.post("/", authenticate, SkillController.create);
router.put("/:id", authenticate, SkillController.update);
router.delete("/:id", authenticate, SkillController.delete);

export default router;
