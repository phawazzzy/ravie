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

// 1761973856
// polaris bank
