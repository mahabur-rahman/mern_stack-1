const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// CREATE PAYMENT WITH STRIPE

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json(stripeRes);
      }
    }
  );
});

// exports
module.exports = router;
