const mongoose = require('mongoose');

const DatabaseServices = require('../interfaces/database-services');
const MongooseAccountRepository = require('./repositories/mongoose-account-repository');
const MongooseAddressRepository = require('./repositories/mongoose-address-repository');
const MongooseStudentRepository = require('./repositories/mongoose-student-repository');
const MongooseTeacherRepository = require('./repositories/mongoose-teacher-repository');
const MongooseGroupRepository = require('./repositories/mongoose-group-repository');
const MongooseCourseRepository = require('./repositories/mongoose-course-repository');
const MongooseAssetRepository = require('./repositories/mongoose-asset-repository');
const MongooseAssessmentRepository = require('./repositories/mongoose-assessment-repository');
const MongooseAssessmentResultRepository = require('./repositories/mongoose-assessment-result-repository');

module.exports = class MongooseDatabaseServices extends DatabaseServices {
  #databaseConnection;

  initRepositories() {
    this.accountRepository = new MongooseAccountRepository();
    this.addressRepository = new MongooseAddressRepository();
    this.groupRepository = new MongooseGroupRepository();
    this.studentRepository = new MongooseStudentRepository();
    this.teacherRepository = new MongooseTeacherRepository();
    this.courseRepository = new MongooseCourseRepository();
    this.assetRepository = new MongooseAssetRepository();
    this.assessmentRepository = new MongooseAssessmentRepository();
    this.assessmentResultRepository = new MongooseAssessmentResultRepository();
  }

  async initDatabase() {
    this.#databaseConnection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
};
