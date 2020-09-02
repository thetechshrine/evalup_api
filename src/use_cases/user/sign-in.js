const accountEnums = require('../../database/enums/account');

module.exports = function buildSignIn({ databaseServices, security }) {
  const {
    accountRespository,
    studentRepository,
    teacherRepository,
  } = databaseServices;

  async function execute({ email, password }) {
    const account = await accountRespository.findByEmail(email);
    if (!account) throw new Error(`Account with email ${email} not found`);

    await security.comparePassword({
      accountPassword: account.password,
      password,
    });

    if (account.role === accountEnums.roles.TEACHER)
      return teacherRepository.findByAccountId(account.id);
    if (account.role === accountEnums.roles.STUDENT)
      return studentRepository.findByAccountId(account.id);

    return account;
  }

  return {
    execute,
  };
};
