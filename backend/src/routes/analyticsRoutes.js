const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.jsx");

// 🔥 ANALYTICS API
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();

    // ================= MONTHLY BOOKINGS =================
    const monthlyMap = {};

    bookings.forEach((b) => {
      const month = new Date(b.eventDate).toLocaleString("default", { month: "short" });

      if (!monthlyMap[month]) monthlyMap[month] = 0;
      monthlyMap[month]++;
    });

    const monthly = Object.keys(monthlyMap).map((m) => ({
      month: m,
      bookings: monthlyMap[m],
    }));

    // ================= REVENUE =================
    const revenueMap = {};

    bookings.forEach((b) => {
      const month = new Date(b.eventDate).toLocaleString("default", { month: "short" });

      if (!revenueMap[month]) revenueMap[month] = 0;
      revenueMap[month] += b.totalAmount || 0;
    });

    const revenue = Object.keys(revenueMap).map((m) => ({
      month: m,
      revenue: revenueMap[m],
    }));

    // ================= EVENT TYPES =================
    const eventMap = {};

    bookings.forEach((b) => {
      if (!eventMap[b.eventType]) eventMap[b.eventType] = 0;
      eventMap[b.eventType]++;
    });

    const events = Object.keys(eventMap).map((e) => ({
      name: e,
      value: eventMap[e],
    }));

    res.json({
      monthly,
      revenue,
      events,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Analytics error" });
  }
});

module.exports = router;