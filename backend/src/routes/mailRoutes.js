const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// 🔥 Gmail transporter (use same env)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// =======================================================
// 📧 1. CONTACT FORM MAIL → goes to admin
// =======================================================
router.post("/contact", async (req, res) => {

  const { name, email, phone, subject, message } = req.body;

  try {

    const mailOptions = {
      from: `"Fine Media Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,   // admin receives
      replyTo: email,
      subject: `New Enquiry: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

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
    await transporter.sendMail({
      from: `"Fine Media" <${process.env.EMAIL_USER}>`,
      to: email,     // user receives mail
      subject: subject,
      text: text,
    });

    res.json({ success: true, message: "Status mail sent" });

  } catch (err) {
    console.log("STATUS MAIL ERROR:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
