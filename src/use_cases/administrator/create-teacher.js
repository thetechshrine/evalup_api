const { Teacher, Account } = require('../../database/entities');
const accountEnums = require('../../database/enums/account');

module.exports = function buildCreateTeacher({ databaseServices, emailServices, tokenUtils }) {
  const { teacherRepository, accountRepository } = databaseServices;

  async function deleteAllDataRelatedToTheProvidedTeacher(teacher) {
    await accountRepository.delete(teacher.account.id);
    await accountRepository.delete(teacher.id);
  }

  async function persistTeacher(teacher) {
    try {
      const persistedTeacher = await teacherRepository.create(teacher);
      await emailServices.sendAccountActivationEmail({
        recipientFullName: `${teacher.firstName} ${teacher.lastName}`,
        recipientEmail: teacher.account.email,
        token: tokenUtils.generateToken({ email: teacher.account.email }),
      });
      return persistedTeacher;
    } catch (error) {
      await deleteAllDataRelatedToTheProvidedTeacher(teacher);
      throw error;
    }
  }

  async function execute({ email, type, gender, lastName, firstName } = {}) {
    const account = Account.newInstance({
      email,
      role: accountEnums.roles.TEACHER,
    });
    const teacher = Teacher.newInstance({
      type,
      gender,
      lastName,
      firstName,
      account,
    });

    await accountRepository.ensureThereIsNoAccountRelatedToTheProvidedEmail(email);
    teacher.account = await accountRepository.create(account);

    const persistedTeacher = await persistTeacher(teacher);

    return persistedTeacher.toJSON();
  }

  return {
    execute,
  };
};
