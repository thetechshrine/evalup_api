const mongoose = require('mongoose');

const DatabaseServices = require('../interfaces/database-services');
const MongooseAccountRepository = require('./repositories/mongoose-account-repository');
const MongooseAddressRepository = require('./repositories/mongoose-address-repository');
const MongooseStudentRepository = require('./repositories/mongoose-student-repository');
const MongooseTeacherRepository = require('./repositories/mongoose-teacher-repository');
const MongooseGroupRepository = require('./repositories/mongoose-group-repository');

const MONGODB_URI = 'mongodb://localhost:27017/evalUp';

module.exports = class MongooseDatabaseServices extends DatabaseServices {
  #databaseConnection;

  initRepositories() {
    this.accountRepository = new MongooseAccountRepository();
    this.addressRepository = new MongooseAddressRepository();
    this.groupRepository = new MongooseGroupRepository();
    this.studentRepository = new MongooseStudentRepository();
    this.teacherRepository = new MongooseTeacherRepository();
  }

  async initDatabase() {
    this.#databaseConnection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
};
