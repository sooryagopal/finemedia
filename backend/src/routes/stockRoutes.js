const express = require('express');
const router = express.Router();

// Get all LED stock
router.get('/', (req, res) => {
  const stockItems = [
    {
      _id: '1',
      name: 'P3 Indoor LED Wall',
      type: 'indoor-led',
      size: { width: 4, height: 4, unit: 'feet' },
      pixelPitch: 'P3 (3mm)',
      resolution: { width: 1280, height: 720 },
      totalQuantity: 10,
      availableQuantity: 8,
      pricePerDay: 5000,
      description: 'High-resolution indoor LED wall perfect for conferences and weddings',
      specifications: {
        brightness: '1200 nits',
        refreshRate: '3840Hz',
        viewingAngle: '160°',
        ipRating: 'IP20',
        weight: '15kg per panel'
      },
      isActive: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      _id: '2',
      name: 'P4 Outdoor LED Screen',
      type: 'outdoor-led',
      size: { width: 8, height: 4, unit: 'feet' },
      pixelPitch: 'P4 (4mm)',
      resolution: { width: 1920, height: 960 },
      totalQuantity: 6,
      availableQuantity: 4,
      pricePerDay: 8000,
      description: 'Weather-resistant outdoor LED screen for concerts and festivals',
      specifications: {
        brightness: '6500 nits',
        refreshRate: '3840Hz',
        viewingAngle: '160°',
        ipRating: 'IP65',
        weight: '22kg per panel'
      },
      isActive: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      _id: '3',
      name: 'P5 Large Format LED',
      type: 'indoor-led',
      size: { width: 16, height: 9, unit: 'feet' },
      pixelPitch: 'P5 (5mm)',
      resolution: { width: 3072, height: 1728 },
      totalQuantity: 4,
      availableQuantity: 2,
      pricePerDay: 15000,
      description: 'Large format LED wall for exhibitions and large venues',
      specifications: {
        brightness: '4500 nits',
        refreshRate: '1920Hz',
        viewingAngle: '140°',
        ipRating: 'IP31',
        weight: '28kg per panel'
      },
      isActive: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ];
  
  res.json({
    success: true,
    data: stockItems,
    count: stockItems.length,
    totalAvailable: stockItems.reduce((sum, item) => sum + item.availableQuantity, 0)
  });
});

module.exports = router;