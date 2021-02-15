const express = require("express");
const { postReview } = require("../controllers/review");
const { mustBeLoggedIn } = require("../helpers/authHelpers");
const { upload } = require("../services/upload");

const router = express.Router();

/* GET home page. */
router.post("/apartments/:id", mustBeLoggedIn, upload.single("media"), postReview);
module.exports = router;
