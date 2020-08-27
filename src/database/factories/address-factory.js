module.exports = function buildAddressFactory({ fakeDataGenerator }) {
  return {
    generate(initialValues = {}) {
      return {
        ...fakeDataGenerator.generateAddress(),
        ...initialValues,
      };
    },
  };
};
