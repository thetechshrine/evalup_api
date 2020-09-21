const { getDefaultProperties } = require('../../application/helpers/factory-utils');

module.exports = function buildCourseFactory({ fakeDataGenerator }) {
  function pickARandomNumber() {
    const MIN = 1;
    const MAX = 100;
    return Math.floor(Math.random() * MAX) + MIN;
  }

  return {
    generate(initialValues = {}) {
      return {
        ...getDefaultProperties(fakeDataGenerator),
        code: fakeDataGenerator.generateStringOfLength(4),
        title: fakeDataGenerator.generateStringOfLength(10),
        description: fakeDataGenerator.generateStringOfLength(30),
        credits: pickARandomNumber(),
        successNote: pickARandomNumber(),
        ...initialValues,
      };
    },
  };
};
