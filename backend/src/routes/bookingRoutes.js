const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const generatePDF = require("../utils/generatePDF");
const Event = require("../models/Event.js");
const { syncToGoogleCalendar } = require("../services/googleCalendarService.js");

// ================= TRANSPORTER =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// ================= 🔥 APPROVE + PDF + MAIL =================
router.post("/approve-with-pdf", async (req, res) => {
  try {
    console.log("🔥 APPROVE API HIT");

    const booking = req.body;

    console.log("📦 Booking:", booking);

    // ✅ SAVE SECURE CALENDAR EVENT & GOOGLE SYNC
    const exists = await Event.findOne({ date: booking.eventDate });

    if (!exists) {
      const newEvent = new Event({
        title: `LED Booking - ${booking.name}`,
        location: booking.location || "Setup Required",
        description: `Approved LED Booking. Contact: ${booking.email} | Service: ${booking.serviceType}`,
        date: booking.eventDate
      });
      
      try {
        const googleEventId = await syncToGoogleCalendar(newEvent);
        if (googleEventId) newEvent.googleEventId = googleEventId;
      } catch(err) {
        console.log("Google Sync skipped during approval.");
      }
      
      await newEvent.save();
      console.log("📅 Official Calendar Event + Google Sync Generated!");
    }

    // ✅ GENERATE PDF
    const pdfPath = await generatePDF(booking);
    console.log("📄 PDF created:", pdfPath);

    // ✅ SEND MAIL
    console.log("📧 Sending to:", booking.email);

    await transporter.sendMail({
      from: `"Fine Media" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "Booking Approved + Quotation",
      html: `
        <h2>Booking Approved ✅</h2>
        <p>Dear ${booking.name},</p>
        <p>Your booking has been approved.</p>
        <p>Quotation attached 📄</p>
      `,
      attachments: [
        {
          filename: "quotation.pdf",
          path: pdfPath
        }
      ]
    });

    console.log("✅ MAIL SENT");

    res.json({ success: true });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ error: "Failed" });
  }
});


// ================= EXISTING ROUTES =================

// GET BOOKINGS
router.get("/", (req, res) => {
  res.json([]);
});

// CREATE BOOKING
router.post("/", (req, res) => {
  res.json({ success: true });
});

module.exports = router;