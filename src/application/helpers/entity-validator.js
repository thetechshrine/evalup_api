const commonEnums = require('../../database/enums/common');
const { ParameterError } = require('./errors');

function validateEntity(entity, className, required, errorPrefix) {
  if (!entity && required) {
    throw new ParameterError(`${errorPrefix} is required`);
  }

  if (entity && required && entity.constructor.name !== className) {
    throw new ParameterError(`${errorPrefix} must be an instance of ${className} class`);
  }
}

function validateAccount({ account, required = false, errorPrefix = '' } = {}) {
  validateEntity(account, commonEnums.entitiesClassNames.ACCOUNT, required, errorPrefix);
}

function validateAddress({ address, required = false, errorPrefix = '' } = {}) {
  validateEntity(address, commonEnums.entitiesClassNames.ADDRESS, required, errorPrefix);
}

function validateGroup({ group, required = false, errorPrefix = '' } = {}) {
  validateEntity(group, commonEnums.entitiesClassNames.GROUP, required, errorPrefix);
}

function validateTeacher({ teacher, required = false, errorPrefix = '' } = {}) {
  validateEntity(teacher, commonEnums.entitiesClassNames.TEACHER, required, errorPrefix);
}

function validateCourse({ course, required = false, errorPrefix = '' } = {}) {
  validateEntity(course, commonEnums.entitiesClassNames.COURSE, required, errorPrefix);
}

function validateAsset({ asset, required = false, errorPrefix = '' } = {}) {
  validateEntity(asset, commonEnums.entitiesClassNames.ASSET, required, errorPrefix);
}

function validateStudent({ student, required = false, errorPrefix = '' } = {}) {
  validateEntity(student, commonEnums.entitiesClassNames.STUDENT, required, errorPrefix);
}

function validateAssessment({ assessment, required = false, errorPrefix = '' } = {}) {
  validateEntity(assessment, commonEnums.entitiesClassNames.ASSESSMENT, required, errorPrefix);
}

function validateAssessmentResult({ assessmentResult, required = false, errorPrefix = '' } = {}) {
  validateEntity(assessmentResult, commonEnums.entitiesClassNames.ASSESSMENT_RESULT, required, errorPrefix);
}

module.exports = {
  validateAccount,
  validateAddress,
  validateGroup,
  validateTeacher,
  validateCourse,
  validateAsset,
  validateStudent,
  validateAssessment,
  validateAssessmentResult,
};
