const TeacherRepository = require('../../../../database/repositories/teacher-repository');
const { Teacher } = require('../../../../database/entities');
const { TeacherModel } = require('../models');
const { ResourceNotFoundError, ParameterError } = require('../../../../application/helpers/errors');
const MongooseAccountRepository = require('./mongoose-account-repository');
const defaultSortingParams = require('../utils/default-sorting-params');

module.exports = class MongooseTeacherRepository extends TeacherRepository {
  static accountRepository = new MongooseAccountRepository();

  async create(teacherObject) {
    const teacher = new TeacherModel({
      ...teacherObject.toJSON(),
      accountId: teacherObject.account.id,
    });
    await teacher.save();

    return new Teacher(Object.assign(teacher, { account: teacherObject.account }));
  }

  async checkById(id) {
    if (!id) throw new ParameterError('teacherId parameter is mandatory');

    const matchingTeachersCount = await TeacherModel.countDocuments({ id });
    if (matchingTeachersCount !== 1) throw new ResourceNotFoundError(`Teacher with id ${id} was not found`);
  }

  async parseToTeacherEntity(teacher, { includeAccount = false } = {}) {
    const entitesToInclude = {};

    if (includeAccount) {
      entitesToInclude.account = await MongooseTeacherRepository.accountRepository.findById(teacher.accountId);
    }

    return new Teacher(Object.assign(teacher, { ...entitesToInclude }));
  }

  async findById(id, entitesToInclude = {}) {
    await this.checkById(id);

    const teacher = await TeacherModel.findOne({ id });

    return this.parseToTeacherEntity(teacher, entitesToInclude);
  }

  async findByAccountId(accountId) {
    const student = await TeacherModel.findOne({ accountId });

    return this.parseToTeacherEntity(student, { includeAccount: true });
  }

  async findAll(entitesToInclude = {}) {
    const teachers = await TeacherModel.find().sort(defaultSortingParams);
    const parseToTeacherEntityPromises = teachers.map((teacher) => this.parseToTeacherEntity(teacher, entitesToInclude));

    return Promise.all(parseToTeacherEntityPromises);
  }

  async delete(id) {
    await TeacherModel.deleteOne({ id });
  }
};
