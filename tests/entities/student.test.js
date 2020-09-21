const { expect } = require('chai');
const { Student, Address, Account, Group } = require('../../src/database/entities');
const { StudentFactory, AddressFactory, AccountFactory, GroupFactory } = require('../../src/database/factories');
const { ParameterError, BadRequestError } = require('../../src/application/helpers/errors');

describe('Student - Entity', () => {
  const shared = {
    requiredProperties: ['gender', 'lastName', 'firstName', 'phone', 'birthDate', 'nationality', 'address', 'account', 'group'],
  };

  describe('create new student', () => {
    beforeEach(() => {
      const address = new Address(AddressFactory.generate());
      const account = new Account(AccountFactory.generate());
      const group = new Group(GroupFactory.generate());

      shared.studentData = StudentFactory.generate({ address, account, group });
    });

    it('should succeed if all properties are valid', () => {
      Student.newInstance(shared.studentData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.studentData[requiredProperty];

        expect(() => {
          Student.newInstance(shared.studentData);
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('all required properties must be provided', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });

    it('should fail if gender is not an authorized gender', () => {
      shared.studentData.gender = 'gender';

      expect(() => {
        Student.newInstance(shared.studentData);
      }).to.throw(BadRequestError, /(?:gender)/);
    });

    it('should fail if nationality is not an authorized nationality', () => {
      shared.studentData.nationality = 'nationality';

      expect(() => {
        Student.newInstance(shared.studentData);
      }).to.throw(BadRequestError, /(?:nationality)/);
    });

    it('should fail if phone is not conformed to the correct format', () => {
      shared.studentData.phone = 'phone';

      expect(() => {
        Student.newInstance(shared.studentData);
      }).to.throw(BadRequestError, /(?:phone)/);
    });
  });
});
