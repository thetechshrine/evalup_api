const { getDefaultProperties } = require('../../application/helpers/factory-utils');

module.exports = function buildAddressFactory({ fakeDataGenerator }) {
  return {
    generate(initialValues = {}) {
      return {
        ...getDefaultProperties(fakeDataGenerator),
        id: fakeDataGenerator.generateId(),
        ...fakeDataGenerator.generateAddress(),
        ...initialValues,
      };
    },
  };
};
