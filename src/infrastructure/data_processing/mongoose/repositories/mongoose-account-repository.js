const AccountRespository = require('../../../../database/repositories/account-repository');
const { Account } = require('../../../../database/entities');
const { AccountModel } = require('../models');

module.exports = class MongooseAccountRepository extends AccountRespository {
  async create(accountObject) {
    const account = new AccountModel(accountObject.toJSON());
    await account.save();

    return new Account(account);
  }

  async findByEmail(email) {
    const account = await AccountModel.findOne({ email });
    return account ? new Account(account) : null;
  }

  async delete(accountId) {
    await AccountModel.deleteOne({ id: accountId });
  }
};
