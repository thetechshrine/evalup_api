const dependencies = require('../../application/config/dependencies');

const AccountFactory = require('./account-factory')(dependencies);
const AddressFactory = require('./address-factory')(dependencies);
const StudentFactory = require('./student-factory')(dependencies);
const GroupFactory = require('./group-factory')(dependencies);
const CourseFactory = require('./course-factory')(dependencies);
const TeacherFactory = require('./teacher-factory')(dependencies);
const AssetFactory = require('./asset-factory')(dependencies);
const AssessmentFactory = require('./assessment-factory')(dependencies);
const FileResourceFactory = require('./file-resource-factory')(dependencies);

module.exports = {
  AccountFactory,
  AddressFactory,
  StudentFactory,
  GroupFactory,
  CourseFactory,
  TeacherFactory,
  AssetFactory,
  AssessmentFactory,
  FileResourceFactory,
};
