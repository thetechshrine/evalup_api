const { Student, Account, Address } = require('../../database/entities');
const accountEnums = require('../../database/enums/account');
const {
  BadRequestError,
  ParameterError,
} = require('../../application/helpers/errors');

module.exports = function buildCreateStudent({
  databaseServices,
  securityServices,
}) {
  const {
    studentRepository,
    addressRepository,
    accountRepository,
    groupRepository,
  } = databaseServices;

  async function checkExistingAccountByEmail(email) {
    const existingAccount = await accountRepository.findByEmail(email);
    if (existingAccount)
      throw new BadRequestError(`Account with email ${email} already exists`);
  }

  async function checkGroupId(groupId) {
    if (!groupId) {
      throw new ParameterError('You must be provided a valid groupId');
    }
    const group = await groupRepository.findById(groupId);
    if (!group) throw new BadRequestError(`Group with id ${groupId} not found`);

    return group;
  }

  async function persistAdress(address, accountId) {
    try {
      const persistedAddress = await addressRepository.create(address);
      return persistedAddress;
    } catch (error) {
      await accountRepository.delete(accountId);
      throw error;
    }
  }

  async function persistStudent(student) {
    try {
      const persistedStudent = await studentRepository.create(student);
      return persistedStudent;
    } catch (error) {
      await accountRepository.delete(student.account.id);
      await addressRepository.delete(student.address.id);
      await studentRepository.delete(student.id);
      throw error;
    }
  }

  async function execute({
    gender,
    lastName,
    firstName,
    nationality,
    phone,
    birthDate,
    email,
    password,
    streetNumber,
    streetName,
    city,
    zipCode,
    country,
    groupId,
  } = {}) {
    const group = await checkGroupId(groupId);
    const account = new Account({
      email,
      password,
      role: accountEnums.roles.STUDENT,
    });
    const address = new Address({
      streetNumber,
      streetName,
      city,
      zipCode,
      country,
    });
    const student = new Student({
      gender,
      lastName,
      firstName,
      nationality,
      phone,
      birthDate,
      account,
      address,
      group,
    });

    await checkExistingAccountByEmail(email);
    const encryptedPassword = await securityServices.hashPassword(password);
    account.password = encryptedPassword;

    student.account = await accountRepository.create(account);
    student.address = await persistAdress(address, account.id);
    const persistedStudent = await persistStudent(student);

    return persistedStudent.toJSON();
  }

  return {
    execute,
  };
};
