const { expect } = require('chai');
const { Asset } = require('../../src/database/entities');
const { AssetFactory } = require('../../src/database/factories');
const { ParameterError, BadRequestError } = require('../../src/application/helpers/errors');

describe('Asset - Entity', () => {
  const shared = {
    requiredProperties: ['type', 'role', 'targetResource', 'url', 'remoteId'],
  };

  describe('create new asset', () => {
    beforeEach(() => {
      shared.assetData = AssetFactory.generate();
    });

    it('should succeed if all properties area valid', () => {
      Asset.newInstance(shared.assetData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.assetData[requiredProperty];

        expect(() => {
          Asset.newInstance(shared.assetData);
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('all required properties must be provided', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });

    it('should fail if type is not an authorized type', () => {
      shared.assetData.type = 'type';

      expect(() => {
        Asset.newInstance(shared.assetData);
      }).to.throw(BadRequestError, /(?:type)/);
    });

    it('should fail if role is not an authorized role', () => {
      shared.assetData.role = 'role';

      expect(() => {
        Asset.newInstance(shared.assetData);
      }).to.throw(BadRequestError, /(?:role)/);
    });

    it('should fail if targetResource is not an authorized targetResource', () => {
      shared.assetData.targetResource = 'targetResource';

      expect(() => {
        Asset.newInstance(shared.assetData);
      }).to.throw(BadRequestError, /(?:targetResource)/);
    });
  });
});
