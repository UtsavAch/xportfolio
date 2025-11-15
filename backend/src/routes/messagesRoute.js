// messagesRoute.js
import express from "express";
import messagesController from "../controllers/messagesController.js";

const router = express.Router();

// GET /api/messages - Get all messages
router.get("/", messagesController.getAllMessages);

// GET /api/messages/:id - Get message by ID
router.get("/:id", messagesController.getMessageById);

// POST /api/messages - Create new message
router.post("/", messagesController.createMessage);

// DELETE /api/messages/:id - Delete message
router.delete("/:id", messagesController.deleteMessage);

export default router;
