require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("Starting SMTP Diagnostic...");
console.log("USER:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS ? "********" + process.env.EMAIL_PASS.slice(-4) : "MISSING");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: "Diagnostic Core Test",
  text: "If you are reading this, the network firewall has successfully been bypassed."
}, (err, info) => {
  if (err) {
    console.error("FATAL ERROR CAUGHT:", err.message);
    if (err.code) console.error("ERROR CODE:", err.code);
    if (err.command) console.error("FAILED AT COMMAND:", err.command);
  } else {
    console.log("✅ SUCCESSFUL DISPATCH. MSG ID:", info.messageId);
  }
});
