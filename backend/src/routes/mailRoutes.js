const express = require("express");


const router = express.Router();

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw5oNFH7zz3fE5mkC1S6mLTJdhr5wi20WdqgwfaGFVrSXHJGzl_W3rienseRxcN3TwL/exec";


// =======================================================
// 📧 1. CONTACT FORM MAIL → goes to admin
// =======================================================
router.post("/contact", async (req, res) => {

  const { name, email, phone, subject, message } = req.body;

  try {

    const payload = {
      to: process.env.EMAIL_USER,
      subject: `New Enquiry: ${subject}`,
      body: `<h3>New Contact Message</h3><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Subject:</b> ${subject}</p><p><b>Message:</b> ${message}</p>`
    };

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload)
    });

    res.json({ success: true, message: "Mail sent" });

  } catch (err) {
    console.log("MAIL ERROR:", err);
    res.status(500).json({ success: false });
  }
});


// =======================================================
// 📧 2. BOOKING APPROVE/REJECT MAIL → goes to user
// =======================================================
router.post("/send-status-mail", async (req, res) => {

  const { email, name, status } = req.body;

  let subject = "";
  let text = "";

  if (status === "Approved") {
    subject = "Booking Approved - Fine Media";
    text = `
Hello ${name},

Your booking has been APPROVED.
We will contact you for further process.

Thank you,
Fine Media Team
`;
  } else {
    subject = "Booking Rejected - Fine Media";
    text = `
Hello ${name},

Sorry! Your booking request was rejected.
Currently date not available.

Thank you,
Fine Media Team
`;
  }

  try {
    const payload = {
      to: email,     
      subject: subject,
      body: text,
    };

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload)
    });

    res.json({ success: true, message: "Status mail sent" });

  } catch (err) {
    console.log("STATUS MAIL ERROR:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
