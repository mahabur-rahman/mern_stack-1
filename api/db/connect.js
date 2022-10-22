const mongoose = require("mongoose");
const DB = process.env.MONGO_URL;

// connect to db
const connectedDB = async () => {
  try {
    const conn = await mongoose.connect(DB);

    console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err.red.underline);
  }
};

// export
module.exports = connectedDB;
