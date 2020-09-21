const { expect } = require('chai');
const { Teacher, Account } = require('../../src/database/entities');
const { TeacherFactory, AccountFactory } = require('../../src/database/factories');
const { ParameterError, BadRequestError } = require('../../src/application/helpers/errors');

describe('Teacher - Entity', () => {
  const shared = {
    requiredProperties: ['type', 'gender', 'lastName', 'firstName', 'account'],
  };

  describe('create new teacher', () => {
    beforeEach(() => {
      const account = new Account(AccountFactory.generate());

      shared.teacherData = TeacherFactory.generate({ account });
    });

    it('should succeed if all properties are valid', () => {
      Teacher.newInstance(shared.teacherData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.teacherData[requiredProperty];

        expect(() => {
          Teacher.newInstance(shared.teacherData);
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('all required properties must be provided', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });

    it('should fail if gender is not an authorized gender', () => {
      shared.teacherData.type = 'type';

      expect(() => {
        Teacher.newInstance(shared.teacherData);
      }).to.throw(BadRequestError, /(?:type)/);
    });

    it('should fail if gender is not an authorized gender', () => {
      shared.teacherData.gender = 'gender';

      expect(() => {
        Teacher.newInstance(shared.teacherData);
      }).to.throw(BadRequestError, /(?:gender)/);
    });
  });
});
