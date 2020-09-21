const { getDefaultProperties } = require('../../application/helpers/factory-utils');
const commonEnums = require('../enums/common');
const teacherEnums = require('../enums/teacher');

module.exports = function buildTeacherFactory({ fakeDataGenerator }) {
  function pickARandomTeacherType() {
    const teacherTypes = Object.keys(teacherEnums.types);
    return teacherTypes[Math.floor(Math.random() * teacherTypes.length)];
  }

  function pickARandomGender() {
    const genders = Object.keys(commonEnums.genders);
    return genders[Math.floor(Math.random() * genders.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        ...getDefaultProperties(fakeDataGenerator),
        type: pickARandomTeacherType(),
        gender: pickARandomGender(),
        lastName: fakeDataGenerator.generatePersonName(),
        firstName: fakeDataGenerator.generatePersonName(),
        ...initialValues,
      };
    },
  };
};
