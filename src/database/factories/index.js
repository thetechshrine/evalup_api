const dependencies = require('../../application/config/dependencies');

const AccountFactory = require('./account-factory')(dependencies);
const PersonalInformationFactory = require('./personal-information-factory')(
  dependencies
);
const AddressFactory = require('./address-factory')(dependencies);
const StudentFactory = require('./student-factory')(dependencies);
const StudentAcademicYearFactory = require('./student-academic-year-factory')(
  dependencies
);
const GroupFactory = require('./group-factory')(dependencies);
const CourseFactory = require('./course-factory')(dependencies);
const TeacherFactory = require('./teacher-factory')(dependencies);
const AssetFactory = require('./asset-factory')(dependencies);

module.exports = {
  AccountFactory,
  PersonalInformationFactory,
  AddressFactory,
  StudentFactory,
  StudentAcademicYearFactory,
  GroupFactory,
  CourseFactory,
  TeacherFactory,
  AssetFactory,
};
