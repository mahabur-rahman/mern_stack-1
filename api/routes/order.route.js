const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

const OrderModel = require("../models/Order.model");

// CREATE
// UPDATE
// DELETE
// GET USER order
// GET ALL

// ##########################
// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new OrderModel(req.body);

  try {
    const savedOrder = await newOrder.save();

    return res.status(201).json(savedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);

    return res.status(200).json("Order has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET USER Order
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await OrderModel.findOne({ userId: req.params.userId });

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL ORDER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await OrderModel.find();

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ##########################

module.exports = router;
