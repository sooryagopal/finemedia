const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const generatePDF = require("../utils/generatePDF");
const BlockedDate = require("../models/BlockedDate");

// ================= TRANSPORTER =================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
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

    // ✅ SAVE BLOCKED DATE
    const exists = await BlockedDate.findOne({ date: booking.eventDate });

    if (!exists) {
      await new BlockedDate({ date: booking.eventDate }).save();
      console.log("📅 Date saved");
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