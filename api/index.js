const express = require("express");
const app = express();
const colors = require("colors");

// dotenv config
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

// ROUTE
const authRoute = require("./routes/auth");

// connected to db
const connectedDB = require("./db/connect");
connectedDB();

// middleware
app.use(express.json());
app.use("/api/auth", authRoute);

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
