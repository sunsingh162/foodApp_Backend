const mongoose = require("mongoose");

// Schema for individual items
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
});

// Schema for categories
const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  items: [itemSchema],
});

// Schema for restaurants
const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  categories: [categorySchema],
});

const restaurantModel = mongoose.model("Restaurant", restaurantSchema);

module.exports = restaurantModel;
