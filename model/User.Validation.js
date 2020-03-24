// Validation
const Joi = require('@hapi/joi');

//Registration Validation
const registerValidation =  (data) =>{
  const UserSchema = {
    name: Joi.string()
            .min(6)
            .required(),
    email: Joi.string()
            .min(6)
            .required()
            .email(),
    password: Joi.string()
            .min(6)
            .required()
  };
  return Joi.validate(data, UserSchema);
}

const loginValidation =  (data) =>{
  const LoginSchema = {
    email: Joi.string()
            .min(6)
            .required()
            .email(),
    password: Joi.string()
            .min(6)
            .required()
  };
  return Joi.validate(data, LoginSchema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
