const UserModel = require('../models/usermodel');

// Add item to cart
const addtocart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ status: false, message: "Item ID is required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ status: false, message: "User not found" });

    const cart = user.cartdata || {};
    cart[itemId] = (cart[itemId] || 0) + 1;
    user.cartdata = cart;

    await user.save();
  

    res.json({ status: true, message: "Item added to cart", cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ status: false, message: "Failed to add item to cart" });
  }
};

// Remove item from cart
const removefromcart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ status: false, message: "Item ID is required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ status: false, message: "User not found" });

    const cart = user.cartdata || {};
    if (cart[itemId]) {
      cart[itemId] -= 1;
      if (cart[itemId] <= 0) {
        delete cart[itemId];
      }
    }

    user.cartdata = cart;
    await user.save();

    res.json({ status: true, message: "Item removed from cart", cart });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ status: false, message: "Failed to remove item from cart" });
  }
};

// Get cart data
const getcart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ status: false, message: "User not found" });

    res.json({ status: true, cart: user.cartdata || {} });
  } catch (err) {
    console.error("Error getting cart:", err);
    res.status(500).json({ status: false, message: "Failed to get cart data" });
  }
};

module.exports = { addtocart, removefromcart, getcart };
