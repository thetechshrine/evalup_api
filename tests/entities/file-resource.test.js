const { expect } = require('chai');
const { FileResource } = require('../../src/database/entities');
const { FileResourceFactory } = require('../../src/database/factories');
const { ParameterError, UnsupportedMediaTypeError, BadRequestError } = require('../../src/application/helpers/errors');

describe('FileResource - Entity', () => {
  const shared = {
    requiredProperties: ['file', 'folder'],
  };

  describe('create new group', () => {
    beforeEach(() => {
      shared.fileResourceData = FileResourceFactory.generate();
    });

    it('should succeed if all parameters are correct', () => {
      FileResource.newInstance(shared.fileResourceData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.fileResourceData[requiredProperty];

        expect(() => {
          FileResource.newInstance(shared.fileResourceData);
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('all required properties must be provided', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });

    it('should fail if folder is not an authorized folder', () => {
      shared.fileResourceData.folder = 'folder';

      expect(() => {
        FileResource.newInstance(shared.fileResourceData);
      }).to.throw(BadRequestError, /(?:folder)/);
    });

    it('should fail if file mimetype is missing', () => {
      delete shared.fileResourceData.file.mimetype;

      expect(() => {
        FileResource.newInstance(shared.fileResourceData);
      }).to.throw(BadRequestError, /(?:mimetype)/);
    });

    it('should fail if file mimetype is not supported', () => {
      shared.fileResourceData.file.mimetype = 'mimetype';

      expect(() => {
        FileResource.newInstance(shared.fileResourceData);
      }).to.throw(UnsupportedMediaTypeError, /(?:mimetype)/);
    });

    it('should fail if file buffer is missing', () => {
      delete shared.fileResourceData.file.buffer;

      expect(() => {
        FileResource.newInstance(shared.fileResourceData);
      }).to.throw(BadRequestError, /(?:buffer)/);
    });

    it('should fail if file buffer is not valid', () => {
      shared.fileResourceData.file.buffer = {};

      expect(() => {
        FileResource.newInstance(shared.fileResourceData);
      }).to.throw(BadRequestError, /(?:buffer)/);
    });
  });
});
