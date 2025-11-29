import { body, validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Validation rules for recommendation request
 */
export const validateRecommendation = [
  body('soilPH')
    .isFloat({ min: 4, max: 10 })
    .withMessage('soilPH must be a number between 4 and 10'),
  body('moisture')
    .isInt({ min: 0, max: 100 })
    .withMessage('moisture must be an integer between 0 and 100'),
  body('soilType')
    .isIn(['Clay', 'Sandy', 'Loamy', 'Silt'])
    .withMessage('soilType must be one of: Clay, Sandy, Loamy, Silt'),
  body('weather')
    .isIn(['tropical', 'arid', 'temperate', 'continental', 'monsoon'])
    .withMessage('weather must be one of: tropical, arid, temperate, continental, monsoon'),
  body('pastCrop')
    .isIn(['wheat', 'rice', 'corn', 'cotton', 'soybean', 'sugarcane', 'none'])
    .withMessage('pastCrop must be one of: wheat, rice, corn, cotton, soybean, sugarcane, none'),
  handleValidationErrors
];

/**
 * Validation rules for chat message
 */
export const validateChatMessage = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('message is required')
    .isLength({ max: 1000 })
    .withMessage('message must be less than 1000 characters'),
  handleValidationErrors
];

