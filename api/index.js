const express = require("express");
const app = express();
const colors = require("colors");

// env config
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

// connected to db
const connectedDB = require("./db/connect");
connectedDB();

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
