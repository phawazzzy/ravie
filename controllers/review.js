const mongoose = require("mongoose");
const reviews = require("../models/reviews");

exports.postReview = async (req, res) => {
  try {
    const { landlordReview, envReview, amenitiesRev } = req.body;
    const apartmentId = req.params.id;
    const loggedInuser = res.locals.user.userId;
    console.log(loggedInuser);

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
      landloard: { review: landlordReview },
      environment: { review: envReview },
      amenities: { review: amenitiesRev },
      reviewer: loggedInuser

    };
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
      message: "operatiion successful",
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
