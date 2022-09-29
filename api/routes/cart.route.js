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
// ##########################

module.exports = router;
