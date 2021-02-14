const express = require("express");
const { signUp, login } = require("../controllers/usersController");
const { userSignupValidation, userLoginValidation } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

/* GET users listing. */
router.post("/register", validator(userSignupValidation), signUp);
router.post("/login", validator(userLoginValidation), login);

module.exports = router;
