const { expect } = require('chai');
const { AssessmentResult, Assessment, Asset, Student } = require('../../src/database/entities');
const { AssessmentFactory, AssetFactory, StudentFactory } = require('../../src/database/factories');
const assetEnums = require('../../src/database/enums/asset');
const { ParameterError, BadRequestError } = require('../../src/application/helpers/errors');

describe('AssessmentResult - Entity', () => {
  const shared = {
    requiredProperties: ['assets', 'assessment', 'student'],
  };

  describe('create new assessment result', () => {
    beforeEach(() => {
      const assets = [
        Asset.newInstance(
          AssetFactory.generate({
            role: assetEnums.roles.PRIMARY,
            type: assetEnums.types.PDF,
          })
        ),
      ];
      const assessment = new Assessment(AssessmentFactory.generate({ assets }));
      const student = new Student(StudentFactory.generate());

      shared.assessmentResultData = { assets, assessment, student };
    });

    it('should succeed if all properties are valid', () => {
      AssessmentResult.newInstance(shared.assessmentResultData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.assessmentResultData[requiredProperty];

        expect(() => {
          AssessmentResult.newInstance(shared.assessmentResultData);
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('all required properties must be provided', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });

    it('should fail if there is no primary role asset in assets array', () => {
      shared.assessmentResultData.assets = [
        Asset.newInstance(
          AssetFactory.generate({
            role: assetEnums.roles.SECONDARY,
          })
        ),
      ];

      expect(() => {
        AssessmentResult.newInstance(shared.assessmentResultData);
      }).to.throw(BadRequestError, /(?:primary)/);
    });

    it('should fail the primary role asset is not a PDF file', () => {
      shared.assessmentResultData.assets = [
        Asset.newInstance(
          AssetFactory.generate({
            role: assetEnums.roles.PRIMARY,
            type: assetEnums.types.REPOSITORY,
          })
        ),
      ];

      expect(() => {
        AssessmentResult.newInstance(shared.assessmentResultData);
      }).to.throw(BadRequestError, /(?:PDF)/);
    });
  });
});
