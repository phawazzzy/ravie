const express = require("express");
const { postReview } = require("../controllers/review");
const { mustBeLoggedIn } = require("../helpers/authHelpers");
const { apartmentValidation } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

/* GET home page. */
router.post("/apartments/:id", mustBeLoggedIn, postReview);
module.exports = router;
