const { expect } = require('chai');
const { Assessment, Asset, Group, Teacher, Course } = require('../../src/database/entities');
const { AssessmentFactory, AssetFactory, GroupFactory, TeacherFactory, CourseFactory } = require('../../src/database/factories');
const assetEnums = require('../../src/database/enums/asset');
const { ParameterError, BadRequestError } = require('../../src/application/helpers/errors');

describe('Assessment - Entity', () => {
  const shared = {
    requiredProperties: ['type', 'title', 'startDate', 'endDate', 'assets', 'teacher', 'group', 'course'],
  };

  describe('create new assessment', () => {
    beforeEach(() => {
      const group = new Group(GroupFactory.generate());
      const assets = [
        new Asset(
          AssetFactory.generate({
            role: assetEnums.roles.PRIMARY,
            type: assetEnums.types.PDF,
          })
        ),
      ];
      const teacher = new Teacher(TeacherFactory.generate());
      const course = new Course(CourseFactory.generate());

      shared.assessmentData = AssessmentFactory.generate({
        assets,
        group,
        teacher,
        course,
      });
    });

    it('should succeed if all properties are valid', () => {
      Assessment.newInstance(shared.assessmentData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.assessmentData[requiredProperty];

        expect(() => {
          Assessment.newInstance(shared.assessmentData);
        }).to.throw(ParameterError, new RegExp(`(?:${requiredProperty})`));
      });
    }

    context('all required properties must be provided', () => {
      shared.requiredProperties.forEach((requiredProperty) => {
        testRequiredProperty(requiredProperty);
      });
    });

    it('should fail if type is not an authorized type', () => {
      shared.assessmentData.type = 'type';

      expect(() => {
        Assessment.newInstance(shared.assessmentData);
      }).to.throw(BadRequestError, /(?:type)/);
    });

    it('should fail if startDate is equal to endDate', () => {
      const date = Date.now();
      shared.assessmentData.startDate = date;
      shared.assessmentData.endDate = date;

      expect(() => {
        Assessment.newInstance(shared.assessmentData);
      }).to.throw(BadRequestError, /(?:startDate)/);
    });

    it('should fail if startDate is later than endDate', () => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setHours(endDate.getHours() + 7);
      shared.assessmentData.startDate = startDate;
      shared.assessmentData.endDate = endDate;

      expect(() => {
        Assessment.newInstance(shared.assessmentData);
      }).to.throw();
    });

    it('should fail if there is no primary role asset in assets array', () => {
      shared.assessmentData.assets = [
        Asset.newInstance(
          AssetFactory.generate({
            role: assetEnums.roles.SECONDARY,
          })
        ),
      ];

      expect(() => {
        Assessment.newInstance(shared.assessmentData);
      }).to.throw(BadRequestError, /(?:primary)/);
    });

    it('should fail the primary role asset is not a PDF file', () => {
      shared.assessmentData.assets = [
        Asset.newInstance(
          AssetFactory.generate({
            role: assetEnums.roles.PRIMARY,
            type: assetEnums.types.REPOSITORY,
          })
        ),
      ];

      expect(() => {
        Assessment.newInstance(shared.assessmentData);
      }).to.throw(BadRequestError, /(?:PDF)/);
    });
  });
});
