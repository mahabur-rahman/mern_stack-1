const express = require("express");
const ProductModel = require("../models/Product");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../routes/verifyToken");

// #################

// add product
// update product
// delete product
//get single product
// get all products

// #################

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new ProductModel(req.body);
  try {
    const savedProduct = await newProduct.save();

    return res.status(201).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// exports
module.exports = router;
