const mongoose = require("mongoose");

// OrderSchema
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    products: [
      {
        productId: { type: String },
        quantity: { type: String, default: 1 },
      },
    ],

    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("Order", OrderSchema);
