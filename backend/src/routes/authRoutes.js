const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.jsx"); // .jsx as per current repo

// Admin Login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email ? email.toLowerCase().trim() : "";

    // Optional: Seed the first admin if none exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0 && email === "admin@finemedia.com" && password === "admin123") {
      await Admin.create({ email, password });
    }

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign(
        { id: admin._id, email: admin.email, role: "admin" },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "30d" }
      );

      return res.json({
        token,
        user: {
          id: admin._id,
          username: "admin",
          email: admin.email,
          role: "admin",
        },
      });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
