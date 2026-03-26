const express = require("express");
const router = express.Router();
const { upload, cloudinary } = require("../utils/cloudinary");
const Gallery = require("../models/Gallery.jsx");

// =====================
// GET all images
// =====================
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gallery" });
  }
});

// =====================
// UPLOAD IMAGE
// =====================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let imageUrl = req.file.path; // Multer-Cloudinary returns URL in 'path'
    
    // If it's local fallback, adjust URL
    if (!process.env.CLOUDINARY_API_KEY) {
       imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const newImage = new Gallery({ image: imageUrl });
    await newImage.save();

    res.json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
});

// =====================
// DELETE IMAGE
// =====================
router.delete("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Extract public_id and delete from cloudinary if applicable
    if (process.env.CLOUDINARY_API_KEY && image.image.includes('cloudinary')) {
      const publicId = image.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`fine_media_gallery/${publicId}`);
    }

    await image.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image" });
  }
});

module.exports = router;
