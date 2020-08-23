const Joi = require('joi');

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
    if (error) throw new Error(`A person name must be at leat 3 characters`);
  }
};
