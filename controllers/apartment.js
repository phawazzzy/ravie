const mongoose = require("mongoose");
const Apartment = require("../models/apartment");

exports.postApartment = async (req, res) => {
  try {
    const { apartmentName, address } = req.body;
    const createApartment = await Apartment.create({ apartmentName, address });

    if (!createApartment) {
      return res.status(409).json({
        status: false,
        message: "An error occured",
        data: null,
        errors: ["CREATION_ERROR"]
      });
    }
    return res.status(201).json({
      status: true,
      message: "Apartment created successfully",
      data: createApartment,
      error: null
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "bad request",
      data: null,
      errors: [error.message]
    });
  }
};

exports.getOneApartment = async (req, res) => {
  try {
    const apartmentId = req.params.id;
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

    // fetch the apartment deatail
    const apartmentDetail = await Apartment.findById(apartmentId);
    if (!apartmentDetail) {
      return res.status(404).json({
        status: false,
        message: "Apartment not found",
        data: null,
        error: ["NOT_FOUND"]
      });
    }
    return res.status(200).json({
      status: true,
      message: "Apartment successfully fetched",
      data: apartmentDetail,
      error: []
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: null,
      errors: [error.message]
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    await Apartment.find().then((result) => res.status(200).json({
      status: true,
      message: "Apartment successfully fetched",
      data: result,
      errors: []
    })).catch((error) => res.status(500).json({
      status: false,
      message: "internal server error",
      data: null,
      errors: [error.message]
    }));
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "bad request",
      data: null,
      errors: [error.message]
    });
  }
};
