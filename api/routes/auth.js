const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const CryptoJS = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json("User not found!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPass = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPass !== req.body.password) {
      return res.status(401).json("Wrong credentials!");
    }

    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
