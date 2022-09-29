const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

const CartModel = require("../models/Cart.model");

// CREATE
// UPDATE
// DELETE
// GET USER CART
// GET ALL

// ##########################
// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new CartModel(req.body);

  try {
    const savedCart = await newCart.save();

    return res.status(201).json(savedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);

    return res.status(200).json("Cart has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userId: req.params.userId });

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL CART
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await CartModel.find();

    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ##########################

module.exports = router;
