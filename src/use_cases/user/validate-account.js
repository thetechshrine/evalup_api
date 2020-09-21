module.exports = function buildUpdatePassword({ databaseServices, securityServices }) {
  const { accountRepository } = databaseServices;

  async function execute({ email, password } = {}) {
    const foundAccount = await accountRepository.findByEmail(email);

    const passwordHash = await securityServices.hashPassword(password);
    foundAccount.password = passwordHash;
    await accountRepository.update(foundAccount);
  }

  return {
    execute,
  };
};
