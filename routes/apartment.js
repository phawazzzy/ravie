const express = require("express");
const { postApartment } = require("../controllers/apartment");
const { mustBeLoggedIn } = require("../helpers/authHelpers");
const { apartmentValidation } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

/* GET home page. */
router.post("/", mustBeLoggedIn, validator(apartmentValidation), postApartment);

module.exports = router;
