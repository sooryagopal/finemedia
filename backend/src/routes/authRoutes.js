const express = require("express");
const router = express.Router();

// Admin Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@finemedia.com" && password === "admin123") {
    return res.json({
      token: "mock_jwt_token",
      user: {
        id: 1,
        username: "admin",
        email: "admin@finemedia.com",
        role: "admin",
      },
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

module.exports = router;
