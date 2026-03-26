const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['wedding', 'corporate', 'concert', 'exhibition', 'religious', 'other']
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventLocation: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['indoor-led', 'outdoor-led', 'live-streaming', 'event-support', 'full-package']
  },
  ledSize: {
    type: String,
    required: true,
    enum: ['p3-16sqft', 'p4-32sqft', 'p5-64sqft', 'p6-100sqft', 'custom']
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  additionalRequirements: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  advancePaid: {
    type: Number,
    default: 0
  },
  adminNotes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for preventing double booking
bookingSchema.index({ eventDate: 1, ledSize: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);