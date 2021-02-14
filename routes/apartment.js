const express = require("express");
const { postApartment } = require("../controllers/apartment");

const router = express.Router();

/* GET home page. */
router.get("/", postApartment);

module.exports = router;
