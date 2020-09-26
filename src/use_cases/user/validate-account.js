module.exports = function buildUpdatePassword({ databaseServices, securityServices, tokenUtils }) {
  const { accountRepository } = databaseServices;

  async function execute({ token, password } = {}) {
    tokenUtils.verifyToken(token);

    const payload = tokenUtils.decodeToken(token);
    const foundAccount = await accountRepository.findByEmail(payload.email);
    const passwordHash = await securityServices.hashPassword(password);
    foundAccount.password = passwordHash;

    await accountRepository.update(foundAccount);
  }

  return {
    execute,
  };
};
