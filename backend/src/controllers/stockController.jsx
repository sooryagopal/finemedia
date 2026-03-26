const Stock = require('../models/Stock');
const Booking = require('../models/Booking');

// Get all stock
exports.getAllStock = async (req, res) => {
  try {
    const stock = await Stock.find({ isActive: true });
    res.json(stock);
  } catch (error) {
    console.error('Get stock error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get stock by ID
exports.getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock item not found' });
    }
    res.json(stock);
  } catch (error) {
    console.error('Get stock by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new stock
exports.createStock = async (req, res) => {
  try {
    const stockData = req.body;
    stockData.availableQuantity = stockData.totalQuantity;
    
    const stock = new Stock(stockData);
    await stock.save();
    
    res.status(201).json({
      message: 'Stock item created successfully',
      stock
    });
  } catch (error) {
    console.error('Create stock error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update stock
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // If total quantity changes, adjust available quantity
    if (updateData.totalQuantity) {
      const stock = await Stock.findById(id);
      if (stock) {
        const diff = updateData.totalQuantity - stock.totalQuantity;
        updateData.availableQuantity = stock.availableQuantity + diff;
      }
    }
    
    const stock = await Stock.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!stock) {
      return res.status(404).json({ message: 'Stock item not found' });
    }
    
    res.json({
      message: 'Stock item updated successfully',
      stock
    });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete stock
exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if stock has active bookings
    const activeBookings = await Booking.find({
      ledSize: stock.name,
      status: { $in: ['approved', 'pending'] }
    });
    
    if (activeBookings.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete stock with active bookings' 
      });
    }
    
    await Stock.findByIdAndUpdate(id, { isActive: false });
    
    res.json({ message: 'Stock item deactivated successfully' });
  } catch (error) {
    console.error('Delete stock error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check availability
exports.checkAvailability = async (req, res) => {
  try {
    const { date, ledSize } = req.query;
    
    const stock = await Stock.findOne({ name: ledSize });
    if (!stock) {
      return res.status(404).json({ message: 'LED size not found' });
    }
    
    // Check bookings for the date
    const bookings = await Booking.find({
      eventDate: new Date(date),
      ledSize: ledSize,
      status: { $in: ['approved', 'pending'] }
    });
    
    const bookedQuantity = bookings.reduce((sum, booking) => sum + booking.quantity, 0);
    const available = stock.availableQuantity - bookedQuantity;
    
    res.json({
      date,
      ledSize,
      totalQuantity: stock.totalQuantity,
      bookedQuantity,
      availableQuantity: Math.max(0, available),
      isAvailable: available > 0
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};