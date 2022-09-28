const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// LOGIN

module.exports = router;
