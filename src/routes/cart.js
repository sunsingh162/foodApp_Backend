const express = require("express");
const { userAuth } = require("../middlewares/auth");
const cartModel = require("../models/cart");
const productModel = require("../models/product");
const { v4: uuidv4 } = require("uuid");

const cartRouter = express.Router();

cartRouter.post("/addToCart", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({ userId, items: [] });
    }
    const existingItemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );
    const product = await productModel.findById(productId);
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += 1;
      cart.items[existingItemIndex].price =
        cart.items[existingItemIndex].quantity * product.price;
    } else {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      cart.items.push({
        productId,
        quantity: 1,
        price: product.price,
      });
    }
    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.put("/cart/update", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemToUpdate = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    if (itemToUpdate) {
      if (quantity > 0) {
        itemToUpdate.quantity = quantity;
        const product = await productModel.findById(productId);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        itemToUpdate.price = itemToUpdate.quantity * product.price;
      } else {
        cart.items = cart.items.filter(
          (item) => !item.productId.equals(productId)
        );
      }
      await cart.save();
      res.json({ message: "Cart updated", cart });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from Cart
cartRouter.delete("/delete/:productId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    await cart.save();
    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// show Cart
cartRouter.get("/showCart", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId", "name image");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate Shareable Link
cartRouter.post("/sharecart", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const sharedLink = uuidv4();
    cart.sharedLink = sharedLink;
    await cart.save();
    res.json({ sharedLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Access Shared Cart
cartRouter.get("/:sharedLink", async (req, res) => {
  try {
    const { sharedLink } = req.params;
    const cart = await cartModel
      .findOne({ sharedLink })
      .populate("items.productId", "name image");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = cartRouter;
