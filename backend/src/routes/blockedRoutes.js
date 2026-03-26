const express = require("express");
const router = express.Router();
const BlockedDate = require("../models/BlockedDate");

// ✅ GET ALL BLOCKED DATES
router.get("/", async (req, res) => {
  try {
    const dates = await BlockedDate.find();
    res.json(dates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching dates" });
  }
});

// ✅ ADD BLOCKED DATE
router.post("/", async (req, res) => {
  try {
    const { date } = req.body;

    const exists = await BlockedDate.findOne({ date });
    if (exists) {
      return res.json({ message: "Already blocked" });
    }

    const newDate = new BlockedDate({ date });
    await newDate.save();

    res.json({ message: "Date blocked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving date" });
  }
});

// ✅ DELETE DATE
router.delete("/:date", async (req, res) => {
  try {
    await BlockedDate.deleteOne({ date: req.params.date });
    res.json({ message: "Date removed" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting date" });
  }
});

module.exports = router;