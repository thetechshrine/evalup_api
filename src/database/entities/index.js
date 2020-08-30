const dependencies = require('../../application/config/dependencies');

const Account = require('./account')(dependencies);
const PersonalInformation = require('./personal-information')(dependencies);
const Address = require('./address')(dependencies);
const Student = require('./student')(dependencies);
const StudentAcademicYear = require('./student-academic-year')(dependencies);
const Group = require('./group')(dependencies);
const Course = require('./course')(dependencies);
const CourseResult = require('./course-result')(dependencies);
const Teacher = require('./teacher')(dependencies);
const Asset = require('./asset')(dependencies);
const AssessmentResult = require('./assessment-result')(dependencies);

module.exports = {
  Account,
  PersonalInformation,
  Address,
  Student,
  StudentAcademicYear,
  Group,
  Course,
  CourseResult,
  Teacher,
  Asset,
  AssessmentResult,
};
