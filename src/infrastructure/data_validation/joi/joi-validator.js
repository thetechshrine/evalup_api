const Joi = require('joi');

const CommonDataValidator = require('../interfaces/common-data-validator');
const { BadRequestError, ParameterError } = require('../../../application/helpers/errors');

module.exports = class JoiValidator extends CommonDataValidator {
  validateValueAsRequired(value, errorMessagePrefix) {
    if (!value && !['number', 'boolean'].includes(typeof value)) throw new ParameterError(`${errorMessagePrefix} is required`);
  }

  validateNumber(supposedNumberValue, errorMessagePrefix) {
    if (supposedNumberValue && Joi.number().validate(supposedNumberValue).error) {
      throw new BadRequestError(`${errorMessagePrefix} must be a valid integer`);
    }
  }

  validateNumberAsRequired(supposedNumberValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedNumberValue, errorMessagePrefix);
    this.validateNumber(supposedNumberValue, errorMessagePrefix);
  }

  validateString(supposedStringValue, errorMessagePrefix) {
    if (supposedStringValue && Joi.string().validate(supposedStringValue).error) {
      throw new BadRequestError(`${errorMessagePrefix} must be a valid string`);
    }
  }

  validateStringAsRequired(supposedStringValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedStringValue, errorMessagePrefix);
    this.validateString(supposedStringValue, errorMessagePrefix);
  }

  validateBoolean(supposedBooleanValue, errorMessagePrefix) {
    if (supposedBooleanValue && Joi.boolean().validate(supposedBooleanValue).error) {
      throw new BadRequestError(`${errorMessagePrefix} must be a valid boolean`);
    }
  }

  validateBooleanAsRequired(supposedBooleanValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedBooleanValue, errorMessagePrefix);
    this.validateBoolean(supposedBooleanValue, errorMessagePrefix);
  }

  validateArray(supposedArrayValue, minLength = 0, errorMessagePrefix) {
    if (supposedArrayValue && Joi.array().min(minLength).validate(supposedArrayValue).error) {
      throw new BadRequestError(`${errorMessagePrefix} must be a valid array ${minLength > 0 ? `with at least ${minLength} items` : ''}`);
    }
  }

  validateArrayAsRequired(supposedArrayValue, minLength, errorMessagePrefix) {
    this.validateValueAsRequired(supposedArrayValue, errorMessagePrefix);
    this.validateArray(supposedArrayValue, minLength, errorMessagePrefix);
  }

  validateEnum(supposedEnumValue, enumValues = [], errorMessagePrefix) {
    if (
      supposedEnumValue &&
      Joi.string()
        .valid(...enumValues)
        .validate(supposedEnumValue).error
    ) {
      throw new BadRequestError(`${errorMessagePrefix} must be one of [${enumValues}]`);
    }
  }

  validateEnumAsRequired(supposedEnumValue, enumValues, errorMessagePrefix) {
    this.validateValueAsRequired(supposedEnumValue, errorMessagePrefix);
    this.validateEnum(supposedEnumValue, enumValues, errorMessagePrefix);
  }

  validateEmail(supposedEmailValue, errorMessagePrefix) {
    if (supposedEmailValue && Joi.string().email().validate(supposedEmailValue).error) {
      throw new BadRequestError(`${errorMessagePrefix} must be a valid email`);
    }
  }

  validateEmailAsRequired(supposedEmailValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedEmailValue, errorMessagePrefix);
    this.validateEmail(supposedEmailValue, errorMessagePrefix);
  }

  validateDate(supposedDateValue, errorMessagePrefix) {
    if (supposedDateValue && Joi.date().validate(supposedDateValue).error) throw new BadRequestError(`${errorMessagePrefix} must be a valid date`);
  }

  validateDateAsRequired(supposedDateValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedDateValue, errorMessagePrefix);
    this.validateDate(supposedDateValue, errorMessagePrefix);
  }

  validateId(supposedIdValue, errorMessagePrefix) {
    if (supposedIdValue && Joi.string().uuid().validate(supposedIdValue).error) {
      throw new BadRequestError(`${errorMessagePrefix} must be a valid uuid`);
    }
  }

  validateIdAsRequired(supposedIdValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedIdValue, errorMessagePrefix);
    this.validateId(supposedIdValue, errorMessagePrefix);
  }

  validateUrl(supposedUrlValue, errorMessagePrefix) {
    if (supposedUrlValue && Joi.string().uri().validate(supposedUrlValue).error) {
      throw new BadRequestError(`${errorMessagePrefix} must be a valid string`);
    }
  }

  validateUrlAsRequired(supposedUrlValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedUrlValue, errorMessagePrefix);
    this.validateUrl(supposedUrlValue, errorMessagePrefix);
  }
};
