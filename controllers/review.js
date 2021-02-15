const mongoose = require("mongoose");
const reviews = require("../models/reviews");

exports.postReview = async (req, res) => {
  try {
    const { landlordReview, envReview, amenitiesRev } = req.body;
    const apartmentId = req.params.id;
    const loggedInuser = res.locals.user.userId;

    // check if apartment id is present
    if (!apartmentId) {
      return res.status(422).json({
        status: false,
        message: "apartment id is missing, please provide it",
        data: null,
        errors: ["INCOMPLETE_REQUIRED_PAYLOAD"]
      });
    }

    //  check if id provided is  valid mongoose id
    const isValid = mongoose.Types.ObjectId.isValid(apartmentId); // true
    if (!isValid) {
      return res.status(422).json({
        status: false,
        message: "invalid apart id",
        data: null,
        errors: ["INVALID_PAYLOAD"]
      });
    }

    const payload = {
      apartment: apartmentId,
      landlord: { review: landlordReview },
      environment: { review: envReview },
      amenities: { review: amenitiesRev },
      reviewer: loggedInuser
    };

    if (req.file) {
      payload.media = req.file.location;
      payload.mediaKey = req.file.key;
    }
    const review = await reviews.create(payload);
    if (!review) {
      return res.status(500).json({
        status: false,
        message: "An error occured",
        data: null,
        error: ["ERROR_OCCURED"]
      });
    }
    return res.status(200).json({
      status: true,
      message: "operation successful",
      data: review,
      error: []
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "bad request",
      data: null,
      error: [error.message]
    });
  }
};

exports.markHelpful = async (req, res) => {
  const { landlordMark, envMark, amenitiesMark } = req.body;

  const reviewId = req.params.id;

  // check if apartment id is present
  if (!reviewId) {
    return res.status(422).json({
      status: false,
      message: "apartment id is missing, please provide it",
      data: null,
      errors: ["INCOMPLETE_REQUIRED_PAYLOAD"]
    });
  }

  //  check if id provided is  valid mongoose id
  const isValid = mongoose.Types.ObjectId.isValid(reviewId); // true
  if (!isValid) {
    return res.status(422).json({
      status: false,
      message: "invalid apart id",
      data: null,
      errors: ["INVALID_PAYLOAD"]
    });
  }

  const like = await reviews.findByIdAndUpdate({ _id: reviewId }, { $inc: { "landlord.helpfulCount": landlordMark, "environment.helpfulCount": envMark, "amenities.helpfulCount": amenitiesMark } });
  if (!like) {
    return res.status(500).json({
      status: false,
      message: "An error occured",
      data: null,
      error: ["ERROR_OCCURED"]
    });
  }
  return res.status(200).json({
    status: true,
    message: "operation successful",
    data: like,
    error: []
  });
};

// exports.sortBy
exports.sortByMostRecent = async (req, res) => {

};

exports.sortByMostHelpfull = async (req, res) => {

};
