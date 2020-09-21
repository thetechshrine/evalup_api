const { getDefaultProperties } = require('../../application/helpers/factory-utils');

module.exports = function buildGroupFactory({ fakeDataGenerator }) {
  return {
    generate() {
      return {
        ...getDefaultProperties(fakeDataGenerator),
        code: fakeDataGenerator.generateStringOfLength(4),
        title: fakeDataGenerator.generateStringOfLength(10),
        description: fakeDataGenerator.generateStringOfLength(30),
      };
    },
  };
};
