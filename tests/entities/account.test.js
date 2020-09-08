const { expect } = require('chai');
const { Account } = require('../../src/database/entities');
const { AccountFactory } = require('../../src/database/factories');

describe('create account entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.account = AccountFactory.generate();
  });

  it('should return an error if there is no email parameter', () => {
    delete shared.account.email;

    expect(() => {
      new Account(shared.account);
    }).to.throw();
  });

  it('should return an error if email is not valid', () => {
    shared.account.email = 'email';

    expect(() => {
      new Account(shared.account);
    }).to.throw();
  });

  it('should return an error if the password length is less than 4', () => {
    shared.account.password = 'not';

    expect(() => {
      new Account(shared.account);
    }).to.throw();
  });

  it('should return an error if there is not role parameter', () => {
    shared.account.role = 'role';

    expect(() => {
      new Account(AccountFactory.generate({ role: 'role' }));
    }).to.throw();
  });

  it('should return an error if the role is not one of authorized role', () => {
    shared.account.role = 'role';

    expect(() => {
      new Account(AccountFactory.generate({ role: 'role' }));
    }).to.throw();
  });

  it('should successfully create a new account with an id', () => {
    const account = new Account(shared.account);

    expect(account).to.have.property('id');
  });
});
