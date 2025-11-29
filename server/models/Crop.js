import mongoose from 'mongoose';

/**
 * Crop Model
 * Stores reference data for different crops
 */
const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  idealSoilPH: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  idealMoisture: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  suitableSoilTypes: [{
    type: String,
    enum: ['Clay', 'Sandy', 'Loamy', 'Silt']
  }],
  suitableWeather: [{
    type: String,
    enum: ['tropical', 'arid', 'temperate', 'continental', 'monsoon']
  }],
  averageYield: {
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
  icon: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;

