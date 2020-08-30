module.exports = function buildCourseFactory({ fakeDataGenerator }) {
  return {
    generate(initialValues = {}) {
      return {
        code: fakeDataGenerator.generateStringOfLength(4),
        title: fakeDataGenerator.generateStringOfLength(10),
        description: fakeDataGenerator.generateStringOfLength(30),
        credits: 6,
        successNote: 10,
        ...initialValues,
      };
    },
  };
};
