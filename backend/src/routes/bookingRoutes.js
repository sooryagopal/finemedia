const express = require("express");
const router = express.Router();
const fs = require("fs");
const generatePDF = require("../utils/generatePDF");
const Event = require("../models/Event.js");
const { syncToGoogleCalendar } = require("../services/googleCalendarService.js");




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

    // ✅ SEND MAIL VIA GOOGLE WEBHOOK
    console.log("📧 Sending to (Webhook API):", booking.email);

    const pdfBuffer = fs.readFileSync(pdfPath);
    const base64Data = pdfBuffer.toString("base64");

    const payload = {
      to: booking.email,
      subject: "Booking Approved + Quotation",
      body: `<h2>Booking Approved ✅</h2><p>Dear ${booking.name},</p><p>Your booking has been confidently approved. Your official quotation is attached.</p><p>Thank you,<br>Fine Media Team</p>`,
      filename: `Quotation-${booking._id || Date.now()}.pdf`,
      mimeType: "application/pdf",
      attachmentBase64: base64Data
    };

    const webhookUrl = "https://script.google.com/macros/s/AKfycbw5oNFH7zz3fE5mkC1S6mLTJdhr5wi20WdqgwfaGFVrSXHJGzl_W3rienseRxcN3TwL/exec";
    
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload)
    });

    console.log("✅ HTTP WEBHOOK MAIL SENT");

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