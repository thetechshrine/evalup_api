const { expect } = require('chai');
const { Account } = require('../../src/database/entities');
const accountEnums = require('../../src/database/enums/account');

describe('account entity', () => {
  it('should return an error if email is not valid', () => {
    expect(() => {
      new Account({
        email: 'email',
        password: 'password',
        role: accountEnums.roles.STUDENT,
      });
    }).to.throw();
  });

  it('should return an error if the password length is less than 4', () => {
    expect(() => {
      new Account({
        email: 'valid@email.com',
        password: 'pas',
        role: accountEnums.roles.TEACHER,
      });
    }).to.throw();
  });

  it('should return an error if the role is not one of [student, administrator, teacher]', () => {
    expect(() => {
      new Account({
        email: 'valid@email.com',
        password: 'pass',
        role: 'role',
      });
    }).to.throw(`Role must be one of [${Object.values(accountEnums.roles)}]`);
  });

  it('should successfully instantiate a new account if all properties are valid', (done) => {
    new Account({
      email: 'valid@email.com',
      password: 'pass',
      role: accountEnums.roles.ADMINISTRATOR,
    });
    done();
  });
});
