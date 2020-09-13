const JoiCommonDataValidator = require('../../infrastructure/data_validation/joi-common-data-validator');
const CoreDataGenerator = require('../../infrastructure/data_generation/core-data-generator');
const buildAccount = require('./account');
const buildAddress = require('./address');
const buildStudent = require('./student');
const buildGroup = require('./group');
const buildCourse = require('./course');
const buildTeacher = require('./teacher');
const buildAsset = require('./asset');
const buildAssessment = require('./assessment');
const buildAssessmentResult = require('./assessment-result');

const entitiesDependencies = {
  commonDataValidator: new JoiCommonDataValidator(),
  commonDataGenerator: new CoreDataGenerator(),
};

module.exports = {
  Account: buildAccount(entitiesDependencies),
  Address: buildAddress(entitiesDependencies),
  Student: buildStudent(entitiesDependencies),
  Group: buildGroup(entitiesDependencies),
  Course: buildCourse(entitiesDependencies),
  Teacher: buildTeacher(entitiesDependencies),
  Asset: buildAsset(entitiesDependencies),
  Assessment: buildAssessment(entitiesDependencies),
  AssessmentResult: buildAssessmentResult(entitiesDependencies),
};
