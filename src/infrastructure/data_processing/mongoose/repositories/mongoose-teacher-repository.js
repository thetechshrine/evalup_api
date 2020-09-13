const TeacherRepository = require('../../../../database/repositories/teacher-repository');
const { Teacher } = require('../../../../database/entities');
const { TeacherModel } = require('../models');

module.exports = class MongooseTeacherRepository extends TeacherRepository {
  async create(teacherObject) {
    const teacher = new TeacherModel({
      ...teacherObject.toJSON(),
      accountId: teacherObject.account.id,
    });
    await teacher.save();

    return new Teacher(
      Object.assign(teacher, { account: teacherObject.account })
    );
  }

  async delete(teacherId) {
    await TeacherModel.deleteOne({ id: teacherId });
  }
};
