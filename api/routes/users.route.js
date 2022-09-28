const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const UserModel = require("../models/User.model");

// UPDATE
// DELETE
// GET ALL
// GET SINGLE USER
// GET MONTHLY STATS

// #################################

// update user

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);

    return res.status(200).json("User has been deleted..");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get single user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const singleUser = await UserModel.findById(req.params.id);

    return res.status(200).json(singleUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get all user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await UserModel.find().sort({ _id: -1 }).limit(5)
      : await UserModel.find();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get monthly user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); // 2022 - today

  try {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },

      {
        $group: {
          _id: "$month", // name of month
          total: { $sum: 1 }, // total number of user register this month
        },
      },
    ]);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// #################################

// export
module.exports = router;
