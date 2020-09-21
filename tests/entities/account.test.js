const { expect } = require('chai');
const { Account } = require('../../src/database/entities');
const { AccountFactory } = require('../../src/database/factories');
const { ParameterError, BadRequestError } = require('../../src/application/helpers/errors');
const { removeImmutablePropertiesFromEntityData } = require('../../src/application/helpers/factory-utils');

describe('Account - Entity', () => {
  const shared = {
    requiredProperties: ['email', 'role'],
  };

  describe('create a new account', () => {
    beforeEach(() => {
      shared.accountData = AccountFactory.generate();
    });

    it('should succeed if all properties are correct', () => {
      Account.newInstance(shared.accountData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.accountData[requiredProperty];

        expect(() => {
          Account.newInstance(shared.accountData);
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('all required properties must be provided', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });

    it('should fail if email is not a valid email address', () => {
      shared.accountData.email = 'email';

      expect(() => {
        Account.newInstance(shared.accountData);
      }).to.throw(BadRequestError, /(?:email)/);
    });

    it('should fail if role is not an authorized role', () => {
      shared.accountData.role = 'role';

      expect(() => {
        Account.newInstance(shared.accountData);
      }).to.throw(BadRequestError, /(?:role)/);
    });
  });

  describe('update account', () => {
    shared.requiredProperties = ['email', 'password', 'role'];

    beforeEach(() => {
      shared.account = Account.newInstance(AccountFactory.generate());
    });

    function testUpdatableProperty(updatableProperty, updateValue) {
      it(`should succeed updating ${updatableProperty}`, () => {
        shared.account[updatableProperty] = updateValue;
        expect(shared.account[updatableProperty]).to.be.equal(updateValue);
      });
    }

    context('updatable properties can be updated with valid values', () => {
      const accountUpdateData = removeImmutablePropertiesFromEntityData(AccountFactory.generate());
      const accountUpdatableProperties = Object.keys(accountUpdateData);

      accountUpdatableProperties.forEach((updatableProperty) => {
        testUpdatableProperty(updatableProperty, accountUpdateData[updatableProperty]);
      });
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail trying to delete the value of ${requiredProperty}`, () => {
        expect(() => {
          shared.account[requiredProperty] = '';
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('required properties values can not be deleted', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });

    it('should fail if email is not a valid email', () => {
      expect(() => {
        shared.account.email = 'email';
      }).to.throw(BadRequestError, /(?:email)/);
    });

    it('should fail if password length is less than 4', () => {
      expect(() => {
        shared.account.password = 'no';
      }).to.throw(BadRequestError, /(?:password)/);
    });

    it('should fail if role is not an authorized role', () => {
      expect(() => {
        shared.account.role = 'role';
      }).to.throw(BadRequestError, /(?:role)/);
    });
  });
});
