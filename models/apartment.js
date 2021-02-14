const mongoose = require("mongoose");

const { Schema } = mongoose;

const apartmentSchema = Schema({
  apartmentName: { type: String, required: true },
  address: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("apartment", apartmentSchema);
