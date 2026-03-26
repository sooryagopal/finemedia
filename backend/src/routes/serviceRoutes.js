const express = require("express");
const router = express.Router();
const Service = require("../models/Service");


// Get all services
router.get("/", async (req, res) => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      const seedData = [
        {
          title: "Premium Indoor LED Wall",
          description: "Stunning P3 high-resolution displays perfect for weddings, corporate halls, and luxury events.",
          features: ["Crystal Clear 4K Resolution", "Seamless Edge-to-Edge", "Professional Sound Included"],
          price: 15000
        },
        {
          title: "Massive Outdoor LED",
          description: "Ultra-bright, weather-proof gigantic displays engineered to captivate massive concert crowds.",
          features: ["Sunlight Readable Brightness", "100% Rain & Weather Proof", "Heavy Duty Truss Support"],
          price: 25000
        },
        {
          title: "Live Streaming & Broadcast",
          description: "Multi-camera HD setups that beam your event flawlessly to YouTube, Facebook, or Private Links.",
          features: ["3-Camera Cinematic Setup", "Live Drone Coverage", "Instant Virtual Hosting"],
          price: 12000
        }
      ];
      await Service.insertMany(seedData);
      console.log("✅ Seeded 3 default Services to database!");
    }

    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add service
router.post("/", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Update service
router.put("/:id", async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Delete service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
