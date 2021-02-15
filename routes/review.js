const express = require("express");
const {
  postReview, markHelpful, sortByMostHelpfull, sortByMostRecent
} = require("../controllers/review");
const { mustBeLoggedIn } = require("../helpers/authHelpers");
const { upload } = require("../services/upload");

const router = express.Router();

/* GET home page. */
router.post("/apartments/:id", mustBeLoggedIn, upload.single("media"), postReview);
router.post("/:id/helpful", markHelpful);
// reviews/:id?sort_by=most_helpful
router.get("/:id", sortByMostHelpfull);

// reviews/:id?sort_by=most_helpful
router.get("/:id", sortByMostRecent);

module.exports = router;
