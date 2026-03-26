const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mock_cloud',
  api_key: process.env.CLOUDINARY_API_KEY || 'mock_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mock_secret'
});

// Setup Storage
let storage;

if (process.env.CLOUDINARY_API_KEY) {
  // Use Cloudinary if credentials exist
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'fine_media_gallery',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
  });
} else {
  // Fallback to local disk storage
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
}

const upload = multer({ storage });

module.exports = {
  upload,
  cloudinary
};
