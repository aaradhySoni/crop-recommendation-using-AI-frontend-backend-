import Recommendation from '../models/Recommendation.js';
import Crop from '../models/Crop.js';

/**
 * Calculate match score for a crop based on user input
 * Uses weighted scoring across:
 * - soil pH
 * - moisture
 * - soil type
 * - weather
 * - crop rotation
 */
const calculateMatchScore = (crop, formData) => {
  let score = 0;

  const { soilPH, moisture, soilType, weather, pastCrop } = formData;

  // --- Soil pH match (40% weight) ---
  if (
    typeof crop.idealSoilPH?.min === 'number' &&
    typeof crop.idealSoilPH?.max === 'number'
  ) {
    if (soilPH >= crop.idealSoilPH.min && soilPH <= crop.idealSoilPH.max) {
      score += 40; // perfect fit
    } else {
      const distance = Math.min(
        Math.abs(soilPH - crop.idealSoilPH.min),
        Math.abs(soilPH - crop.idealSoilPH.max)
      );
      // lose up to all 40 points if very far
      const penalty = distance * 6;
      score += Math.max(0, 40 - penalty);
    }
  }

  // --- Moisture match (25% weight) ---
  if (
    typeof crop.idealMoisture?.min === 'number' &&
    typeof crop.idealMoisture?.max === 'number'
  ) {
    if (moisture >= crop.idealMoisture.min && moisture <= crop.idealMoisture.max) {
      score += 25;
    } else {
      const distance = Math.min(
        Math.abs(moisture - crop.idealMoisture.min),
        Math.abs(moisture - crop.idealMoisture.max)
      );
      const penalty = distance * 0.5; // more forgiving for moisture
      score += Math.max(0, 25 - penalty);
    }
  }

  // --- Soil type match (20% weight) ---
  if (Array.isArray(crop.suitableSoilTypes)) {
    if (crop.suitableSoilTypes.includes(soilType)) {
      score += 20;
    } else if (
      soilType &&
      crop.suitableSoilTypes.some((t) => t.toLowerCase() === soilType.toLowerCase())
    ) {
      // small bonus if case mismatch / similar
      score += 10;
    }
  }

  // --- Weather match (10% weight) ---
  if (Array.isArray(crop.suitableWeather)) {
    if (crop.suitableWeather.includes(weather)) {
      score += 10;
    } else if (
      weather &&
      crop.suitableWeather.some((w) => w.toLowerCase() === weather.toLowerCase())
    ) {
      score += 5;
    }
  }

  // --- Crop rotation (5% weight) ---
  if (pastCrop && pastCrop !== 'none') {
    // bonus if we change crop
    if (pastCrop.toLowerCase() !== crop.name.toLowerCase()) {
      score += 5;
    }
  } else {
    // first-time farming gets small bonus
    score += 3;
  }

  // Clamp between 0 and 100
  return Math.round(Math.min(100, Math.max(0, score)));
};

/**
 * Generate reasoning text for recommendation
 */
const generateReasoning = (crop, formData) => {
  const reasons = [];
  const { soilPH, moisture, soilType, weather } = formData;

  if (
    typeof crop.idealSoilPH?.min === 'number' &&
    typeof crop.idealSoilPH?.max === 'number' &&
    soilPH >= crop.idealSoilPH.min &&
    soilPH <= crop.idealSoilPH.max
  ) {
    reasons.push(`your soil pH of ${soilPH.toFixed(1)}`);
  }

  if (Array.isArray(crop.suitableSoilTypes) && crop.suitableSoilTypes.includes(soilType)) {
    reasons.push(`${soilType.toLowerCase()} soil type`);
  }

  if (
    typeof crop.idealMoisture?.min === 'number' &&
    typeof crop.idealMoisture?.max === 'number' &&
    moisture >= crop.idealMoisture.min &&
    moisture <= crop.idealMoisture.max
  ) {
    reasons.push(`the moisture level of ${moisture}%`);
  }

  if (Array.isArray(crop.suitableWeather) && crop.suitableWeather.includes(weather)) {
    reasons.push(`${weather} weather conditions`);
  }

  if (reasons.length === 0) {
    return `${crop.name} can adapt to your current conditions with proper management and best farming practices.`;
  }

  return `${crop.name} is a strong fit for your conditions, especially due to ${reasons.join(
    ', '
  )}. Historical patterns and agronomic data show good yield stability and market demand for this crop in similar environments.`;
};

/**
 * Parse and normalize form data from request
 */
const parseFormData = (body) => {
  return {
    soilPH: Number(body.soilPH),
    moisture: Number(body.moisture),
    soilType: body.soilType,
    weather: body.weather,
    pastCrop: body.pastCrop,
    sessionId: body.sessionId || '',
  };
};

/**
 * Get crop recommendations based on form data
 * POST /api/recommendations
 */
export const getRecommendations = async (req, res) => {
  try {
    const { soilPH, moisture, soilType, weather, pastCrop, sessionId } = parseFormData(
      req.body
    );

    // --- Basic validation ---
    if (
      isNaN(soilPH) ||
      isNaN(moisture) ||
      !soilType ||
      !weather ||
      typeof pastCrop !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Missing or invalid fields: soilPH, moisture, soilType, weather, pastCrop are required.',
      });
    }

    if (soilPH < 4 || soilPH > 10) {
      return res.status(400).json({
        success: false,
        message: 'soilPH must be between 4 and 10',
      });
    }

    if (moisture < 0 || moisture > 100) {
      return res.status(400).json({
        success: false,
        message: 'moisture must be between 0 and 100',
      });
    }

    // --- Load crops from DB, or initialize defaults if DB is empty / incomplete ---
    let crops = await Crop.find({});

    // If DB has fewer than 3 crops, it usually means it's not properly seeded → use defaults
    if (!crops || crops.length < 3) {
      crops = await initializeDefaultCrops();
    }

    // --- Calculate scores for all crops ---
    const formData = { soilPH, moisture, soilType, weather, pastCrop };

    const recommendations = crops.map((crop) => {
      const matchScore = calculateMatchScore(crop, formData);
      const reasoning = generateReasoning(crop, formData);

      return {
        cropName: crop.name,
        matchScore,
        expectedYield: crop.averageYield,
        profitPotential: crop.profitPotential,
        sustainability: crop.sustainability,
        icon: crop.icon,
        reasoning,
      };
    });

    // Sort highest score first
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    const topRecommendations = recommendations.slice(0, 3);

    const bestMatch = topRecommendations[0];

    // --- Save record in DB ---
    const recommendationDoc = new Recommendation({
      soilPH,
      moisture,
      soilType,
      weather,
      pastCrop,
      recommendations: topRecommendations,
      bestMatch: {
        cropName: bestMatch.cropName,
        matchScore: bestMatch.matchScore,
      },
      sessionId,
    });

    await recommendationDoc.save();

    // --- Response shape ---
    // Kept backward compatible (data.bestMatch, data.recommendations, data.formData)
    // PLUS extra top-level fields (topMatch, score, explanation, secondary) for frontend
    res.status(200).json({
      success: true,
      topMatch: bestMatch.cropName,
      score: bestMatch.matchScore,
      explanation: bestMatch.reasoning,
      secondary: topRecommendations.slice(1).map((r) => ({
        cropName: r.cropName,
        score: r.matchScore,
        expectedYield: r.expectedYield,
        profitPotential: r.profitPotential,
      })),
      data: {
        bestMatch: {
          cropName: bestMatch.cropName,
          matchScore: bestMatch.matchScore,
        },
        recommendations: topRecommendations,
        formData,
      },
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating recommendations',
      error: error.message,
    });
  }
};

/**
 * Initialize default crops if database is empty or incomplete
 */
const initializeDefaultCrops = async () => {
  const defaultCrops = [
    {
      name: 'Wheat',
      idealSoilPH: { min: 6.0, max: 8.5 },
      idealMoisture: { min: 40, max: 80 },
      suitableSoilTypes: ['Loamy', 'Clay'],
      suitableWeather: ['temperate', 'continental'],
      averageYield: '4.5 tons/acre',
      profitPotential: '$2,400/acre',
      sustainability: 'Excellent',
      icon: '🌾',
    },
    {
      name: 'Corn',
      idealSoilPH: { min: 5.5, max: 7.5 },
      idealMoisture: { min: 50, max: 90 },
      suitableSoilTypes: ['Loamy', 'Sandy'],
      suitableWeather: ['temperate', 'tropical', 'monsoon'],
      averageYield: '3.8 tons/acre',
      profitPotential: '$2,100/acre',
      sustainability: 'Good',
      icon: '🌽',
    },
    {
      name: 'Rice',
      idealSoilPH: { min: 5.0, max: 7.0 },
      idealMoisture: { min: 70, max: 100 },
      suitableSoilTypes: ['Clay', 'Loamy'],
      suitableWeather: ['tropical', 'monsoon', 'temperate'],
      averageYield: '3.2 tons/acre',
      profitPotential: '$1,900/acre',
      sustainability: 'Good',
      icon: '🍚',
    },
    {
      name: 'Cotton',
      idealSoilPH: { min: 5.5, max: 8.0 },
      idealMoisture: { min: 30, max: 70 },
      suitableSoilTypes: ['Sandy', 'Loamy'],
      suitableWeather: ['arid', 'tropical', 'temperate'],
      averageYield: '2.5 tons/acre',
      profitPotential: '$2,800/acre',
      sustainability: 'Fair',
      icon: '🧵',
    },
    {
      name: 'Soybean',
      idealSoilPH: { min: 6.0, max: 7.5 },
      idealMoisture: { min: 40, max: 80 },
      suitableSoilTypes: ['Loamy', 'Silt'],
      suitableWeather: ['temperate', 'continental'],
      averageYield: '2.8 tons/acre',
      profitPotential: '$2,200/acre',
      sustainability: 'Excellent',
      icon: '🫘',
    },
    {
      name: 'Sugarcane',
      idealSoilPH: { min: 6.0, max: 7.5 },
      idealMoisture: { min: 60, max: 90 },
      suitableSoilTypes: ['Clay', 'Loamy'],
      suitableWeather: ['tropical', 'monsoon'],
      averageYield: '45 tons/acre',
      profitPotential: '$3,500/acre',
      sustainability: 'Good',
      icon: '🎋',
    },
  ];

  // Clear existing crops only if needed?  
  // Here we *don't* delete; we just ensure defaults exist.
  await Crop.deleteMany({});
  const createdCrops = await Crop.insertMany(defaultCrops);
  return createdCrops;
};

/**
 * Get recommendation history
 * GET /api/recommendations/history
 */
export const getRecommendationHistory = async (req, res) => {
  try {
    const { sessionId, limit = 10 } = req.query;

    const query = sessionId ? { sessionId } : {};

    const recommendations = await Recommendation.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit, 10))
      .select('-__v');

    res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error('Error getting recommendation history:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching history',
      error: error.message,
    });
  }
};

/**
 * Get a specific recommendation by ID
 * GET /api/recommendations/:id
 */
export const getRecommendationById = async (req, res) => {
  try {
    const { id } = req.params;

    const recommendation = await Recommendation.findById(id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found',
      });
    }

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    console.error('Error getting recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recommendation',
      error: error.message,
    });
  }
};
