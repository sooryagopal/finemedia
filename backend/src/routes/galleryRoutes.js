const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

let images = []; // temporary storage

// =====================
// STORAGE CONFIG
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// =====================
// GET all images
// =====================
router.get("/", (req, res) => {
  res.json(images);
});


// =====================
// UPLOAD IMAGE
// =====================
router.post("/", upload.single("image"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  const newImg = {
    _id: Date.now().toString(),
    url: imageUrl
  };

  images.push(newImg);

  res.json(newImg);
});


// =====================
// DELETE IMAGE
// =====================
router.delete("/:id", (req, res) => {
  images = images.filter(img => img._id !== req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
