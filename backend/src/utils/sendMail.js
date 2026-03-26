const nodemailer = require("nodemailer");

const sendMail = async (name, email, message) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_GMAIL@gmail.com",
      pass: "YOUR_APP_PASSWORD"
    }
  });

  const mailOptions = {
    from: email,
    to: "YOUR_GMAIL@gmail.com",
    subject: "New Contact Message - Fine Media",
    html: `
      <h3>New Message from Website</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
