// Validation
const Joi = require('@hapi/joi');

//Registration Validation
const postValidation = (data) => {
    const UserSchema = {
        title: Joi.string()
            .min(6)
            .required(),
        description: Joi.string()
            .min(25)
            .required(),
        createdBy: Joi.string()
            .min(6)
            .required(),
        updatedBy: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, UserSchema);
}

module.exports.postValidation = postValidation;