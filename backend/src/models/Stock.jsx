const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['indoor-led', 'outdoor-led', 'accessories']
  },
  size: {
    width: { type: Number, required: true }, // in feet
    height: { type: Number, required: true }  // in feet
  },
  pixelPitch: {
    type: String,
    required: true
  },
  resolution: {
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  totalQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  availableQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  specifications: {
    brightness: String,
    refreshRate: String,
    viewingAngle: String,
    ipRating: String,
    weight: String
  },
  images: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for total area
stockSchema.virtual('totalArea').get(function() {
  return this.size.width * this.size.height;
});

module.exports = mongoose.model('Stock', stockSchema);