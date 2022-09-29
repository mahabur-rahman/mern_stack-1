const express = require("express");
const router = express.Router();

const ProductModel = require("../models/Product.model");
const { verifyTokenAndAdmin } = require("./verifyToken");

// CREATE
// UPDATE
// DELETE
// GET PRODUCT
// GET ALL PRODUCTS

// #########################
// create product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new ProductModel(req.body);

  try {
    const savedProduct = await newProduct.save();

    return res.status(201).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// #########################

module.exports = router;
