const AccountRespository = require('../../../../database/repositories/account-repository');
const { Account } = require('../../../../database/entities');
const { AccountModel } = require('../models');
const { ResourceNotFoundError, ParameterError, BadRequestError } = require('../../../../application/helpers/errors');

module.exports = class MongooseAccountRepository extends AccountRespository {
  async create(accountObject) {
    const account = new AccountModel(accountObject.toJSON());
    await account.save();

    return new Account(account);
  }

  async checkById(id) {
    if (!id) throw new ParameterError('accountId parameter is required');

    const matchingAccountsCount = await AccountModel.countDocuments({ id });
    if (matchingAccountsCount !== 1) throw new ResourceNotFoundError(`Account with id ${id} not found`);
  }

  async checkByEmail(email) {
    if (!email) throw new ParameterError('email parameter is required');

    const matchingAccountsCount = await AccountModel.countDocuments({ email });
    if (matchingAccountsCount !== 1) throw new ResourceNotFoundError(`Account with email ${email} not found`);
  }

  parseToAccountEntity(account) {
    const accountCopy = account;
    delete accountCopy.password;

    return new Account(account);
  }

  async findById(id) {
    await this.checkById(id);

    const account = await AccountModel.findOne({ id });

    return this.parseToAccountEntity(account);
  }

  async findByEmail(email) {
    await this.checkByEmail(email);

    const account = await AccountModel.findOne({ email });

    return new Account(account);
  }

  async ensureThereIsNoAccountRelatedToTheProvidedEmail(email) {
    const foundAccount = await AccountModel.findOne({ email });
    if (foundAccount) throw new BadRequestError(`Email ${email} is already associated with an account`);
  }

  async update(accountObject) {
    const account = await AccountModel.findOne({ id: accountObject.id });
    Object.assign(account, accountObject.toJSON());
    await account.save();

    return this.parseToAccountEntity(account);
  }

  async delete(accountId) {
    await AccountModel.deleteOne({ id: accountId });
  }
};
