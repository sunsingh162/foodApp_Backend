const express = require("express");
const Restaurant = require("../models/restaurant");
const { userAuth } = require("../middlewares/auth");

const restaurantRouter = express.Router();

// API to add multiple restaurants
restaurantRouter.post("/addRes", async (req, res) => {
  try {
    const restaurants = req.body;
    if (!restaurants || !Array.isArray(restaurants)) {
      return res
        .status(400)
        .json({ message: "Please provide restaurants" });
    }
    const restaurantDocuments = restaurants.map(
      (restaurant) => new Restaurant(restaurant)
    );
    const savedRestaurants = await Restaurant.insertMany(restaurantDocuments);
    res.status(201).json(savedRestaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//API to get all the restaurant when home page loads
restaurantRouter.get("/getRes", userAuth, async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = restaurantRouter;
