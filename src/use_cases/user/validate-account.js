const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildUpdatePassword({ databaseServices, securityServices, tokenUtils }) {
  const { accountRepository } = databaseServices;

  async function execute({ token, password } = {}) {
    tokenUtils.verifyToken(token);

    const { payload } = tokenUtils.decodeToken(token);
    const foundAccount = await accountRepository.findByEmail(payload.email);
    if (foundAccount.active) throw BadRequestError('Your account is already active');

    const passwordHash = await securityServices.hashPassword(password);
    foundAccount.password = passwordHash;
    foundAccount.active = true;

    await accountRepository.update(foundAccount);
  }

  return {
    execute,
  };
};
