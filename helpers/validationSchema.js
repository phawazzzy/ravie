const Joi = require("@hapi/joi");

const userSignupValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
    .required(),
  password: Joi.string().trim().label("password").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength")
    .required(),
  firstName: Joi.string().trim().min(3).label("firstName")
    .required(),
  lastName: Joi.string().trim().min(3).label("lastName")
    .required()
});

const userLoginValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
    .required(),
  password: Joi.string().trim().label("password")
    .required()
});

module.exports = { userSignupValidation, userLoginValidation };
