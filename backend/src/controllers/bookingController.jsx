const Booking = require('../models/Booking');
const Stock = require('../models/Stock');
const { validationResult } = require('express-validator');
const generatePDF = require("../utils/generatePDF");
// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookingData = req.body;

    // Check for existing booking on same date
    const existingBooking = await Booking.findOne({
      eventDate: bookingData.eventDate,
      ledSize: bookingData.ledSize,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingBooking) {
      return res.status(400).json({ 
        message: 'LED wall already booked for this date. Please choose another date or size.' 
      });
    }
    if (status === "approved") {
  const date = new Date(booking.eventDate)
    .toISOString()
    .split("T")[0];

  // save in localStorage alternative (better: DB)
  const fs = require("fs");

  let blockedDates = [];

  if (fs.existsSync("blockedDates.json")) {
    blockedDates = JSON.parse(fs.readFileSync("blockedDates.json"));
  }

  if (!blockedDates.includes(date)) {
    blockedDates.push(date);
    fs.writeFileSync("blockedDates.json", JSON.stringify(blockedDates));
  }
}
    // Check stock availability
    const stock = await Stock.findOne({ name: bookingData.ledSize });
    if (!stock || stock.availableQuantity < bookingData.quantity) {
      return res.status(400).json({ 
        message: 'Insufficient stock available' 
      });
    }

    // Calculate total amount
    const totalAmount = stock.pricePerDay * bookingData.duration * bookingData.quantity;

    const booking = new Booking({
      ...bookingData,
      totalAmount
    });

    await booking.save();

    // Update stock availability
    stock.availableQuantity -= bookingData.quantity;
    await stock.save();

    res.status(201).json({
      message: 'Booking request submitted successfully',
      bookingId: booking._id,
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings (admin)
exports.getAllBookings = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    let filter = {};
    
    if (status) filter.status = status;
    if (startDate && endDate) {
      filter.eventDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'username email');

    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    if (adminNotes) booking.adminNotes = adminNotes;
    
    // If rejected or cancelled, return stock
    if ((status === 'rejected' || status === 'cancelled') && booking.status !== status) {
      const stock = await Stock.findOne({ name: booking.ledSize });
      if (stock) {
        stock.availableQuantity += booking.quantity;
        await stock.save();
      }
    }

    await booking.save();

    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get booking statistics
exports.getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const approvedBookings = await Booking.countDocuments({ status: 'approved' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    
    const revenue = await Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalBookings,
      pendingBookings,
      approvedBookings,
      completedBookings,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};