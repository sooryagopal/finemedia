const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const generatePDF = require("../utils/generatePDF");
const BlockedDate = require("../models/BlockedDate");

// ================= TRANSPORTER =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prathishaashwin15@gmail.com",
    pass: "tgodgmbfazxguayj"
  }
});

// ================= STATUS MAIL =================
router.post("/send-status-mail", async (req, res) => {
  const { email, name, status } = req.body;

  let subject = "";
  let message = "";

  if (status === "Approved") {
    subject = "Booking Approved - Fine Media";
    message = `Hello ${name},\n\nYour booking has been APPROVED.\n\nThank you.\nFine Media`;
  } else {
    subject = "Booking Rejected - Fine Media";
    message = `Hello ${name},\n\nSorry! Your booking was rejected.\n\nThank you.\nFine Media`;
  }

  try {
    await transporter.sendMail({
      from: "prathishaashwin15@gmail.com",
      to: email,
      subject: subject,
      text: message,
    });

    console.log("✅ STATUS MAIL SENT");

    res.json({ success: true });

  } catch (err) {
    console.log("❌ MAIL ERROR:", err);
    res.status(500).json({ error: "Mail not sent" });
  }
});


// ================= 🔥 APPROVE + PDF =================
router.post("/approve-with-pdf", async (req, res) => {
  try {
    const booking = req.body;

    console.log("🔥 APPROVE API HIT");
    console.log("📦 Booking:", booking);

    // ✅ SAVE BLOCKED DATE
    const exists = await BlockedDate.findOne({ date: booking.eventDate });
    if (!exists) {
      await new BlockedDate({ date: booking.eventDate }).save();
    }

    // ✅ GENERATE PDF
    const pdfPath = await generatePDF(booking);
    console.log("📄 PDF created:", pdfPath);

    // ✅ SEND MAIL WITH PDF
    await transporter.sendMail({
      from: "prathishaashwin15@gmail.com",
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

    console.log("✅ PDF MAIL SENT");

    res.json({ success: true });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ error: "Failed" });
  }
});

module.exports = router;