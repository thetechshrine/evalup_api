const StudentRepository = require('../../../../database/repositories/student-repository');
const { Student } = require('../../../../database/entities');
const { StudentModel } = require('../models');

module.exports = class MongooseStudentRepository extends StudentRepository {
  async create(studentObject) {
    const student = new StudentModel({
      ...studentObject.toJSON(),
      accountId: studentObject.account.id,
      addressId: studentObject.address.id,
    });
    await student.save();

    return new Student(
      Object.assign(student, {
        account: studentObject.account,
        address: studentObject.address,
        group: studentObject.group,
      })
    );
  }

  async delete(studentId) {
    await StudentModel.deleteOne({ id: studentId });
  }
};
