const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = Schema({
  apartment: { type: Schema.Types.ObjectId, ref: "apartment", required: true },
  media: { type: String },
  mediaKey: { type: String },
  landlord: {
    review: { type: String },
    helpfulCount: { type: Number }
  },
  environment: {
    review: { type: String },
    helpfulCount: { type: Number }
  },
  amenities: {
    review: { type: String },
    helpfulCount: { type: Number }
  },
  dateCreated: { type: Date, default: Date.now },
  reviewer: { type: Schema.Types.ObjectId, ref: "user", required: true }

});

module.exports = mongoose.model("reviews", reviewSchema);
