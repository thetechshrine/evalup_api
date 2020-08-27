const { expect } = require('chai');
const { Account } = require('../../src/database/entities');
const { AccountFactory } = require('../../src/database/factories');

describe('create account entity', () => {
  it('should return an error if email is not valid', () => {
    expect(() => {
      new Account(AccountFactory.generate({ email: 'email' }));
    }).to.throw();
  });

  it('should return an error if the password length is less than 4', () => {
    expect(() => {
      new Account(AccountFactory.generate({ password: 'not' }));
    }).to.throw();
  });

  it('should return an error if the role is not one of [student, administrator, teacher]', () => {
    expect(() => {
      new Account(AccountFactory.generate({ role: 'role' }));
    }).to.throw();
  });

  it('should successfully create a new account with an id', () => {
    const account = new Account(AccountFactory.generate());
    expect(account).to.have.property('id');
  });
});
