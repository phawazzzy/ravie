const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: `${__dirname}/.env` });

const apartmentRouter = require("./routes/apartment");
const usersRouter = require("./routes/users");

const app = express();
const dbUri = process.env.DB_URI;

// mongoose connection
mongoose.connect(dbUri, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
// eslint-disable-next-line no-console
  .then(console.log("database connected"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/apartments", apartmentRouter);
app.use("/users", usersRouter);

module.exports = app;
