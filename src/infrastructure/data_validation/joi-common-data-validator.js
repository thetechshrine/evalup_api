const Joi = require('joi');
const uuid = require('uuid');

const CommonDataValidator = require('./interfaces/common-data-validator');

module.exports = class JoiCommonDataValidator extends CommonDataValidator {
  validateEmail(email) {
    const emailSchema = Joi.string().email().required();
    const { error } = emailSchema.validate(email);
    if (error) throw new Error(`Invalid email ${email}`);
  }

  validatePhoneNumber(phone) {
    const phoneSchema = Joi.string()
      .length(10)
      .regex(/^[0]{1}\d{9}$/)
      .required();
    const { error } = phoneSchema.validate(phone);
    if (error) throw new Error(`Invalid phone number ${phone}`);
  }

  validateDate(date) {
    const dateSchema = Joi.date().required();
    const { error } = dateSchema.validate(date);
    if (error) throw new Error(`Invalid date value ${date}`);
  }

  validatePersonName(personName) {
    const personNameSchema = Joi.string().min(3).required();
    const { error } = personNameSchema.validate(personName);
    if (error)
      throw new Error(
        `A person name must be at leat 3 characters ${personName}`
      );
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
