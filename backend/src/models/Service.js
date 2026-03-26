const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  features: [String],
  price: String,
});

module.exports = mongoose.model("Service", serviceSchema);
