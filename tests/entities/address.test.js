const { expect } = require('chai');
const { Address } = require('../../src/database/entities');
const { AddressFactory } = require('../../src/database/factories');
const { ParameterError, BadRequestError } = require('../../src/application/helpers/errors');

describe('Address - Entity', () => {
  const shared = {
    requiredProperties: ['streetNumber', 'streetName', 'city', 'zipCode', 'country'],
  };

  describe('create a new address', () => {
    beforeEach(() => {
      shared.addressData = AddressFactory.generate();
    });

    it('should succeed if all properties are correct', () => {
      Address.newInstance(shared.addressData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.addressData[requiredProperty];

        expect(() => {
          Address.newInstance(shared.addressData);
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('all required properties must be provided', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });

    it('should fail if streetNumber is a negative value', () => {
      shared.addressData.streetNumber = -1000;

      expect(() => {
        Address.newInstance(shared.addressData);
      }).to.throw(BadRequestError, /(?:streetNumber)/);
    });
  });
});
