// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Load env
dotenv.config();

const app = express();


// ======================
// Middleware
// ======================
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactRoutes = require("./src/routes/contactRoutes");
app.use("/api/contact", contactRoutes);

const blockedRoutes = require("./src/routes/blockedRoutes");
app.use("/api/blocked-dates", blockedRoutes);
const mailRoutes = require("./src/routes/mailRoutes");
app.use("/api/mail", mailRoutes);

// ======================
// Root API
// ======================
app.get("/", (req, res) => {
  res.json({
    message: "Fine Media Event Management System API",
    status: "Online",
    version: "1.0.0",
    time: new Date().toISOString()
  });
});


// ======================
// Health Check
// ======================
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime()
  });
});


// ======================
// Routes Import
// ======================
const serviceRoutes = require("./src/routes/serviceRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");

// services
app.use("/api/services", serviceRoutes);

// gallery
app.use("/api/gallery", galleryRoutes);
app.use("/api/bookings", require("./src/routes/bookingRoutes"));

// ======================
// Serve Uploaded Images
// ======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ======================
// Optional Dynamic Loader
// ======================
const loadRoute = (routePath, routeName) => {
  try {
    const fullPath = path.join(__dirname, routePath);

    if (fs.existsSync(fullPath + ".js")) {
      console.log(`✅ Loaded ${routeName}`);
      return require(fullPath);
    }

    throw new Error("Not found");

  } catch (err) {
    console.log(`⚠️ ${routeName} not found, using mock`);

    const router = express.Router();

    router.get("/", (req, res) => {
      res.json([]);
    });

    return router;
  }
};

// optional routes
app.use("/api/auth", loadRoute("./src/routes/authRoutes", "auth"));
app.use("/api/stock", loadRoute("./src/routes/stockRoutes", "stock"));

const analyticsRoutes = require("./src/routes/analyticsRoutes");
app.use("/api/analytics", analyticsRoutes);
// ======================
// MongoDB Connection
// ======================
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("⚠️ No MongoDB URI found");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

  } catch (err) {
    console.log("❌ MongoDB Error:", err.message);
  }
};

connectDB();


// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
===================================
🚀 FINE MEDIA BACKEND STARTED
===================================
🌐 http://localhost:${PORT}
📊 /api/health
📦 /api/services
🖼️ /api/gallery
===================================
  `);
});
