/* eslint-disable no-underscore-dangle */
const { hashPassword, tokengen, isPasswordValid } = require("../helpers/authHelpers");
const User = require("../models/users");

exports.signUp = async (req, res) => {
  try {
    // console.log("hello user");
    const {
      email, password, firstName, lastName
    } = req.body;

    // check if email doesnt exist before
    const existingUser = await User.findOne({ email }, { email });

    if (existingUser) {
      return res.status(401).json({
        status: false,
        message: "user with this email address exist",
        data: null,
        error: ["DUPLICATE_EMAIL"]
      });
    }

    // hash password
    const hash = hashPassword(password);

    const createdUser = await User.create(
      {
        email, firstName, lastName, password: hash
      }
    );
    createdUser.password = false;
    // eslint-disable-next-line no-underscore-dangle
    const token = tokengen({ userId: createdUser._id });
    if (!createdUser) {
      return res.status(409).json({
        status: false,
        message: "an error occured",
        data: null,
        error: ["user with this email address exist"]
      });
    }

    return res.status(201).json({
      status: true,
      message: "user account created successfully",
      data: {
        user: createdUser,
        token
      },
      error: null
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "bad request",
      data: null,
      errors: [error]
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user account
    const user = await User.findOne({ email }, { _v: 0 });
    if (!user || user.length < 1) {
      return res.status(404).json({
        status: false,
        message: "Auth Failed, please check that your login details are correct",
        data: null,
        error: ["Un-Authorized"]
      });
    }
    // check password
    const checkPassword = isPasswordValid(user.password, password);
    if (!checkPassword) {
      return res.status(401).json({
        status: false,
        message: "Auth Failed, please check that your login details are correct",
        data: null,
        error: ["WRONG_PASSWORD"]
      });
    }

    // generate login token
    const token = tokengen({ userId: user._id });
    return res.status(200).json({
      status: true,
      message: "User has been logged in successfully",
      data: {
        user,
        token
      },
      error: null
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "bad request",
      data: null,
      error: [error]
    });
  }
};
