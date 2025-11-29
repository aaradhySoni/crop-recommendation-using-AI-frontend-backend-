import express from 'express';
import {
  sendMessage,
  getChatHistory
} from '../controllers/chatController.js';
import { validateChatMessage } from '../middleware/validation.js';

const router = express.Router();

/**
 * @route   POST /api/chat
 * @desc    Send a chat message and get AI response
 * @access  Public
 */
router.post('/', validateChatMessage, sendMessage);

/**
 * @route   GET /api/chat/history
 * @desc    Get chat history for a session
 * @access  Public
 */
router.get('/history', getChatHistory);

export default router;

