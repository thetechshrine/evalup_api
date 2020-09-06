const dependencies = require('../../application/config/dependencies');

const Account = require('./account')(dependencies);
const Address = require('./address')(dependencies);
const Student = require('./student')(dependencies);
const Group = require('./group')(dependencies);
const Course = require('./course')(dependencies);
const Teacher = require('./teacher')(dependencies);
const Asset = require('./asset')(dependencies);
const AssessmentResult = require('./assessment-result')(dependencies);

module.exports = {
  Account,
  Address,
  Student,
  Group,
  Course,
  Teacher,
  Asset,
  AssessmentResult,
};
