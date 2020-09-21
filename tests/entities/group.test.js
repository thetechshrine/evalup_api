const { expect } = require('chai');
const { Group } = require('../../src/database/entities');
const { GroupFactory } = require('../../src/database/factories');
const { ParameterError } = require('../../src/application/helpers/errors');

describe('Group - Entity', () => {
  const shared = {
    requiredProperties: ['code', 'title'],
  };

  describe('create new group', () => {
    beforeEach(() => {
      shared.groupData = GroupFactory.generate();
    });

    it('should succeed if all parameters are correct', () => {
      Group.newInstance(shared.groupData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.groupData[requiredProperty];

        expect(() => {
          Group.newInstance(shared.groupData);
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('all required properties must be provided', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });
  });
});
