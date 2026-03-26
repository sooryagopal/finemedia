const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {

  const { name, email, phone, subject, message } = req.body;

  try {

    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // VERY IMPORTANT (not 465)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


    const mailOptions = {
  from: `"Fine Media Website" <${process.env.EMAIL_USER}>`,  
  to: process.env.EMAIL_USER,   // YOU receive mail
  replyTo: email,               // ⭐ IMPORTANT (reply goes to sender)
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

module.exports = router;
