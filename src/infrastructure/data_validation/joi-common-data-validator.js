const Joi = require('joi');

const CommonDataValidator = require('./interfaces/common-data-validator');

module.exports = class JoiCommonDataValidator extends CommonDataValidator {
  validateEmail(email) {
    const emailSchema = Joi.string().email().required();
    const { error } = emailSchema.validate(email);
    if (error) throw new Error(`Invalid email ${email}`);
  }

  validateDate(date) {
    const dateSchema = Joi.date().required();
    const { error } = dateSchema.validate(date);
    if (error) throw new Error(`Invalid date value ${date}`);
  }

  validateId(id) {
    const idSchema = Joi.string().uuid().required();
    const { error } = idSchema.validate(id);
    if (error) throw new Error(`Id must be a valid uuid ${id}`);
  }

  validateUrl(url) {
    const urlSchema = Joi.string().uri().required();
    const { error } = urlSchema.validate(url);
    if (error) throw new Error(`${url} is not a valid url`);
  }
};
