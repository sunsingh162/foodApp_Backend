const mongoose = require("mongoose");


// Schema for restaurants
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: String, required: true},
  min_order: { type: Number, required: true},
  delivery_time: { type: Number, required: true}
});

const restaurantModel = mongoose.model("Restaurant", restaurantSchema);

module.exports = restaurantModel;
