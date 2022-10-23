const mongoose = require("mongoose");

// userSchema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// user model
const UserModel = mongoose.model("User", UserSchema);

// export
module.exports = UserModel;
