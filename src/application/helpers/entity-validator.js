const commonEnums = require('../../database/enums/common');
const { ParameterError } = require('./errors');

function validateEntity(entity, className, required) {
  if (!entity && required) {
    throw new ParameterError(`${className} is required`);
  }

  if (entity && entity.constructor.name !== className) {
    throw new ParameterError(
      `entity parameter must be an instance of ${className} class`
    );
  }
}

function validateAccount({ account, required = false } = {}) {
  validateEntity(account, commonEnums.entitiesClassNames.ACCOUNT, required);
}

function validateAddress({ address, required = false } = {}) {
  validateEntity(address, commonEnums.entitiesClassNames.ADDRESS, required);
}

function validateGroup({ group, required = false } = {}) {
  validateEntity(group, commonEnums.entitiesClassNames.GROUP, required);
}

function validateTeacher({ teacher, required = false } = {}) {
  validateEntity(teacher, commonEnums.entitiesClassNames.TEACHER, required);
}

function validateCourse({ course, required = false } = {}) {
  validateEntity(course, commonEnums.entitiesClassNames.COURSE, required);
}

function validateAsset({ asset, required = false } = {}) {
  validateEntity(asset, commonEnums.entitiesClassNames.ASSET, required);
}

function validateStudent({ student, required = false } = {}) {
  validateEntity(student, commonEnums.entitiesClassNames.STUDENT, required);
}

function validateAssessment({ assessment, required = false } = {}) {
  validateEntity(
    assessment,
    commonEnums.entitiesClassNames.ASSESSMENT,
    required
  );
}

function validateAssessmentResult({ assessmentResult, required = false } = {}) {
  validateEntity(
    assessmentResult,
    commonEnums.entitiesClassNames.ASSESSMENT_RESULT,
    required
  );
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
