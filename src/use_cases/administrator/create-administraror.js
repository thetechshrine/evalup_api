const { Account } = require('../../database/entities');
const accountEnums = require('../../database/enums/account');

module.exports = function buildCreateAdministrator({ databaseServices, securityServices }) {
  const { accountRepository } = databaseServices;

  async function execute({ email, password } = {}) {
    const account = Account.newInstance({
      email,
      role: accountEnums.roles.ADMINISTRATOR,
    });
    const passwordHash = await securityServices.hashPassword(password);
    account.password = passwordHash;

    await accountRepository.ensureThereIsNoAccountRelatedToTheProvidedEmail(email);

    const persistedAccount = await accountRepository.create(account);

    return persistedAccount.toJSON();
  }

  return {
    execute,
  };
};
