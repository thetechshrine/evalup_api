module.exports = function buildGroupFactory({ fakeDataGenerator }) {
  return {
    generate() {
      return {
        code: fakeDataGenerator.generateStringOfLength(4),
        description: fakeDataGenerator.generateStringOfLength(30),
      };
    },
  };
};
