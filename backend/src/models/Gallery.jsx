const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model("Gallery", gallerySchema);
