const express = require("express");
const app = express();
const colors = require("colors");
const cors = require("cors");

// dotenv config
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

// ROUTE
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

// connected to db
const connectedDB = require("./db/connect");
connectedDB();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
