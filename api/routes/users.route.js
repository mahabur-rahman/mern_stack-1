const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
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

// #################################

// export
module.exports = router;
