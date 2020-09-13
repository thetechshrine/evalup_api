const { Teacher, Account } = require('../../database/entities');
const accountEnums = require('../../database/enums/account');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildCreateTeacher({
  databaseServices,
  securityServices,
}) {
  const { teacherRepository, accountRepository } = databaseServices;

  async function checkExistingAccountByEmail(email) {
    const existingAccount = await accountRepository.findByEmail(email);
    if (existingAccount)
      throw new BadRequestError(`Account with email ${email} already exists`);
  }

  async function persistTeacher(teacher) {
    try {
      const persistedTeacher = await teacherRepository.create(teacher);
      return persistedTeacher;
    } catch (error) {
      await accountRepository.delete(teacher.account.id);
      await accountRepository.delete(teacher.id);
      throw error;
    }
  }

  async function execute({ email, password, type } = {}) {
    const account = new Account({
      email,
      password,
      role: accountEnums.roles.TEACHER,
    });
    const teacher = new Teacher({
      type,
      account,
    });

    await checkExistingAccountByEmail(email);
    const encryptedPassword = await securityServices.hashPassword(password);
    account.password = encryptedPassword;

    teacher.account = await accountRepository.create(account);
    const persistedTeacher = await persistTeacher(teacher);

    return persistedTeacher.toJSON();
  }

  return {
    execute,
  };
};
