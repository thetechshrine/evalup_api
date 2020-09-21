const { Student, Account, Address } = require('../../database/entities');
const accountEnums = require('../../database/enums/account');

module.exports = function buildCreateStudent({ databaseServices, securityServices }) {
  const { studentRepository, addressRepository, accountRepository, groupRepository } = databaseServices;

  async function persistAdress(address, accountId) {
    try {
      const persistedAddress = await addressRepository.create(address);
      return persistedAddress;
    } catch (error) {
      await accountRepository.delete(accountId);
      throw error;
    }
  }

  async function deleteAllDataRelatedToTheProvidedStudent(student) {
    await accountRepository.delete(student.account.id);
    await addressRepository.delete(student.address.id);
    await studentRepository.delete(student.id);
  }

  async function persistStudent(student) {
    try {
      const persistedStudent = await studentRepository.create(student);
      return persistedStudent;
    } catch (error) {
      await deleteAllDataRelatedToTheProvidedStudent(student);
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
    const group = await groupRepository.findById(groupId);
    const account = Account.newInstance({
      email,
      password,
      role: accountEnums.roles.STUDENT,
    });
    const address = Address.newInstance({
      streetNumber,
      streetName,
      city,
      zipCode,
      country,
    });
    const student = Student.newInstance({
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

    await accountRepository.ensureThereIsNoAccountRelatedTheProvidedEmail(email);
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
