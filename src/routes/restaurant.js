const express = require('express');
const Restaurant = require('../models/restaurant');

const restaurantRouter = express.Router();

// API to add a restaurant with categories and items
restaurantRouter.post('/addResItems', async (req, res) => {
  const { restaurantName, categories } = req.body;

  if (!restaurantName || !categories || !Array.isArray(categories)) {
    return res.status(400).json({ message: 'Invalid input data.' });
  }

  try {
    const restaurant = new Restaurant({
      restaurantName,
      categories,
    });

    await restaurant.save();
    res.status(200).json({ message: 'Restaurant data added successfully!', restaurant });
  } catch (error) {
    console.error('Error saving restaurant data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = restaurantRouter