import express from 'express';
import {
  getRecommendations,
  getRecommendationHistory,
  getRecommendationById
} from '../controllers/recommendationController.js';
import { validateRecommendation } from '../middleware/validation.js';

const router = express.Router();

/**
 * @route   POST /api/recommendations
 * @desc    Get crop recommendations based on soil and weather data
 * @access  Public
 */
router.post('/', validateRecommendation, getRecommendations);

/**
 * @route   GET /api/recommendations/history
 * @desc    Get recommendation history
 * @access  Public
 */
router.get('/history', getRecommendationHistory);

/**
 * @route   GET /api/recommendations/:id
 * @desc    Get a specific recommendation by ID
 * @access  Public
 */
router.get('/:id', getRecommendationById);

export default router;

