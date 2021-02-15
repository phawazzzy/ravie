/* eslint-disable no-console */
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

// const s3 = new aws.S3();

const s3 = new aws.S3({
  secretAccessKey: process.env.S3_ACCESS_SECRET, /* required */
  accessKeyId: process.env.S3_ACCESS_KEY, /* required */
  // accessKeyId: "L2bD6sAgcCsF/LKZNx/wWZ9a/y6kcoUN2tpHZ5Pj",
  Bucket: process.env.BUCKET_NAME, /* required */
  region: "us-east-2"

});

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "us-east-1"
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter: imageFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = { upload };
