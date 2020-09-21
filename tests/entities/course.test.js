const { expect } = require('chai');
const { Course, Group } = require('../../src/database/entities');
const { CourseFactory, GroupFactory } = require('../../src/database/factories');
const { ParameterError } = require('../../src/application/helpers/errors');

describe('Course - Entity', () => {
  const shared = {
    requiredProperties: ['code', 'title', 'group'],
  };

  describe('create new course', () => {
    beforeEach(() => {
      const group = new Group(GroupFactory.generate());

      shared.courseData = CourseFactory.generate({ group });
    });

    it('should succeed if all parameters are correct', () => {
      Course.newInstance(shared.courseData);
    });

    function testRequiredProperty(requiredProperty) {
      it(`should fail if ${requiredProperty} is missing`, () => {
        delete shared.courseData[requiredProperty];

        expect(() => {
          Course.newInstance(shared.courseData);
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
