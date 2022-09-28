const mongoose = require("mongoose");
const DB = process.env.MONGO_URL;

const connectedDB = async () => {
  try {
    const conn = await mongoose.connect(DB);

    console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`No connection : ${err}`.cyan.red);
  }
};

module.exports = connectedDB;
