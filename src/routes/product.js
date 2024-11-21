const express = require("express");
const productModel = require("../models/product");
const { userAuth } = require("../middlewares/auth");

const productRouter = express.Router();

// Add products to the restaurant with categories
productRouter.post("/addProd", async (req, res) => {
  try {
    const { products, restaurantId } = req.body;
    if (!products || !restaurantId) {
      return res
        .status(400)
        .json({ message: "Please provide products and restaurantId" });
    }
    const productDocuments = products.map(
      (product) =>
        new productModel({
          ...product,
          restaurantId,
        })
    );
    const savedProducts = await productModel.insertMany(productDocuments);
    res.status(200).json(savedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API to get the Product list using restaurantId
productRouter.get("/getRes/:resId", userAuth, async (req, res) => {
  try {
    const products = await productModel.find({
      restaurantId: req.params.resId,
    });
    res
      .json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = productRouter;
