// routes/contactMessageRoute.js
import express from "express";
import ContactMessageController from "../controllers/contactMessageController.js";
import { authenticate } from "../auth/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/", ContactMessageController.create);

// CMS/admin routes: protected
router.get("/", authenticate, ContactMessageController.getAll);
router.get("/:id", authenticate, ContactMessageController.getById);
router.put("/:id/read", authenticate, ContactMessageController.markAsRead);
router.delete("/:id", authenticate, ContactMessageController.delete);

export default router;
