const { Teacher, Account } = require('../../database/entities');
const accountEnums = require('../../database/enums/account');

module.exports = function buildCreateTeacher({ databaseServices, securityServices }) {
  const { teacherRepository, accountRepository } = databaseServices;

  async function deleteAllDataRelatedToTheProvidedTeacher(teacher) {
    await accountRepository.delete(teacher.account.id);
    await accountRepository.delete(teacher.id);
  }

  async function persistTeacher(teacher) {
    try {
      const persistedTeacher = await teacherRepository.create(teacher);
      return persistedTeacher;
    } catch (error) {
      await deleteAllDataRelatedToTheProvidedTeacher(teacher);
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

    await accountRepository.ensureThereIsNoAccountRelatedToTheProvidedEmail(email);
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
