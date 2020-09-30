const StudentRepository = require('../../../../database/repositories/student-repository');
const { Student } = require('../../../../database/entities');
const { StudentModel } = require('../models');
const { ResourceNotFoundError, ParameterError, BadRequestError } = require('../../../../application/helpers/errors');
const MongooseAccountRepository = require('./mongoose-account-repository');
const MongooseAddressRepository = require('./mongoose-address-repository');
const MongooseGroupRepository = require('./mongoose-group-repository');
const defaultSortingParams = require('../utils/default-sorting-params');

module.exports = class MongooseStudentRepository extends StudentRepository {
  static accountRepository = new MongooseAccountRepository();
  static addressRepository = new MongooseAddressRepository();
  static groupRepository = new MongooseGroupRepository();

  async create(studentObject) {
    const student = new StudentModel({
      ...studentObject.toJSON(),
      accountId: studentObject.account.id,
      addressId: studentObject.address.id,
      groupId: studentObject.group.id,
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

  async checkById(id) {
    if (!id) throw new ParameterError('studentId parameter is mandatory');

    const matchingStudentsCount = await StudentModel.countDocuments({ id });
    if (matchingStudentsCount !== 1) throw new ResourceNotFoundError(`Student with id ${id} was not found`);
  }

  async parseToStudentEntity(student, { includeAccount = false, includeAddress = false, includeGroup = false } = {}) {
    const entitesToInclude = {};

    if (includeAccount) {
      entitesToInclude.account = await MongooseStudentRepository.accountRepository.findById(student.accountId);
    }
    if (includeAddress) {
      entitesToInclude.address = await MongooseStudentRepository.addressRepository.findById(student.addressId);
    }
    if (includeGroup) {
      entitesToInclude.group = await MongooseStudentRepository.groupRepository.findById(student.groupId);
    }

    return new Student(Object.assign(student, { ...entitesToInclude }));
  }

  async findById(id, entitesToInclude = {}) {
    await this.checkById(id);

    const student = await StudentModel.findOne({ id });

    return this.parseToStudentEntity(student, entitesToInclude);
  }

  async findByAccountId(accountId) {
    const student = await StudentModel.findOne({ accountId });

    return this.parseToStudentEntity(student, { includeAccount: true, includeAddress: true, includeGroup: true });
  }

  async ensureThereIsNoAccountRelatedToTheProvidedPhone(phone) {
    const foundStudent = await StudentModel.findOne({ phone });
    if (foundStudent) throw new BadRequestError(`Phone ${phone} is already associated with a student`);
  }

  async findAll(entitesToInclude = {}) {
    const students = await StudentModel.find().sort(defaultSortingParams);
    const parseToStudentEntityPromises = students.map((student) => this.parseToStudentEntity(student, entitesToInclude));

    return Promise.all(parseToStudentEntityPromises);
  }

  async delete(id) {
    await StudentModel.deleteOne({ id });
  }
};
