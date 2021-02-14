const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  dateRegistered: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", userSchema);
