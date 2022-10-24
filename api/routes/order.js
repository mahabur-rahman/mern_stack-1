const express = require("express");
const router = express.Router();
const OrderModel = require("../models/Order");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../routes/verifyToken");

// CREATE
// UPDATE
// DELETE
// GET ONE USER ORDER
// GET ALL ORDERS
// GET MONTHLY INCOME

// ######################

// CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new OrderModel(req.body);

  try {
    const savedOrder = await newOrder.save();

    return res.status(201).json(savedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATE ORDER
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);

    return res.status(200).json("Order has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ONE USER ORDER
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await OrderModel.findOne({ userId: req.params.userId });

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await OrderModel.find();

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();

  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    return res.status(200).json(income);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// export
module.exports = router;
