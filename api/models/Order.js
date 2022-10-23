const mongoose = require("mongoose");

// OrderSchema
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],

    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

// Order model
const OrderModel = mongoose.model("Order", OrderSchema);

// export
module.exports = OrderModel;
