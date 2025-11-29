import mongoose from 'mongoose';

/**
 * Recommendation Model
 * Stores user crop recommendation requests and results
 */
const recommendationSchema = new mongoose.Schema({
  // User input data
  soilPH: {
    type: Number,
    required: true,
    min: 4,
    max: 10
  },
  moisture: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  soilType: {
    type: String,
    required: true,
    enum: ['Clay', 'Sandy', 'Loamy', 'Silt']
  },
  weather: {
    type: String,
    required: true,
    enum: ['tropical', 'arid', 'temperate', 'continental', 'monsoon']
  },
  pastCrop: {
    type: String,
    required: true,
    enum: ['wheat', 'rice', 'corn', 'cotton', 'soybean', 'sugarcane', 'none']
  },
  // Recommendation results
  recommendations: [{
    cropName: {
      type: String,
      required: true
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    expectedYield: {
      type: String,
      required: true
    },
    profitPotential: {
      type: String,
      required: true
    },
    sustainability: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Poor'],
      default: 'Good'
    },
    reasoning: {
      type: String,
      default: ''
    }
  }],
  // Best match (top recommendation)
  bestMatch: {
    cropName: {
      type: String,
      required: true
    },
    matchScore: {
      type: Number,
      required: true
    }
  },
  // Optional: User session/identifier
  sessionId: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
recommendationSchema.index({ createdAt: -1 });
recommendationSchema.index({ sessionId: 1 });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;

