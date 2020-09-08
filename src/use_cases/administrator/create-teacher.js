const { Teacher, Account } = require('../../database/entities');
const accountEnums = require('../../database/enums/account');

module.exports = function buildCreateTeacher({ databaseServices }) {
  const { teacherRepository, accountRepository } = databaseServices;

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

    const persistedAccount = await accountRepository.create(account);
    teacher.account = persistedAccount;
    const persistedTeacher = await teacherRepository.create(teacher);

    return persistedTeacher.toJSON();
  }

  return {
    execute,
  };
};
