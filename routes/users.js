const express = require("express");
const { signUp } = require("../controllers/usersController");

const router = express.Router();

/* GET users listing. */
router.get("/register", signUp);

module.exports = router;
