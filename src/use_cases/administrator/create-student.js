const { Student, Account, Address } = require('../../database/entities');
const accountEnums = require('../../database/enums/account');

module.exports = function buildCreateStudent({ databaseServices }) {
  const { studentRepository } = databaseServices;

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

    const persistedStudent = await studentRepository.create(student);

    return persistedStudent.toJSON();
  }

  return {
    execute,
  };
};
