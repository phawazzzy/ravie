/* eslint-disable linebreak-style */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// gets the secret from env
const { JWTSECRET } = process.env;

// hashpassword using the bcrypt package
const hashPassword = (plainPassword) => {
  // checks if there is password provided
  if (!plainPassword) {
    throw new Error("Error hashing password");
  }

  // salt round which bcrypt will use
  const salt = bcrypt.genSaltSync(10);

  // return the generated hashed string
  return bcrypt.hashSync(plainPassword, salt);
};

// function to check if the password matches with the hashed string in the db
const isPasswordValid = (hashedPass, plainPass) => bcrypt.compareSync(plainPass, hashedPass);

// function to generate a token

const tokengen = (payload) => jwt.sign(payload, `${JWTSECRET}`, { expiresIn: "6h" });

// function to verify and decode the token
const decodeToken = (token) => jwt.verify(token, `${JWTSECRET}`);

const mustBeLoggedIn = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers.authorization || req.body.token;
  // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    req.apiUser = jwt.verify(token, process.env.JWTSECRET);
    res.locals.user = req.apiUser;
    // res.locals is guaranteed to hold state over the life of a request.
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Sorry, you must provide a valid token."
    });
  }
};

module.exports = {
  hashPassword,
  isPasswordValid,
  tokengen,
  decodeToken,
  mustBeLoggedIn
};
