const { Student, Account, Address } = require('../../database/entities');
const accountEnums = require('../../database/enums/account');

module.exports = function buildCreateStudent({ databaseServices }) {
  const {
    studentRepository,
    accountRepository,
    addressRepository,
  } = databaseServices;

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
  } = {}) {
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
    });

    const persistedAccount = await accountRepository.create(account);
    const persistedAddress = await addressRepository.create(address);

    student.account = persistedAccount;
    student.address = persistedAddress;
    const persistedStudent = await studentRepository.create(student);

    return persistedStudent.toJSON();
  }

  return {
    execute,
  };
};
