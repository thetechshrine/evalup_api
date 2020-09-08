const assessmentEnums = require('../enums/assessment');

module.exports = function buildStudentFactory({ fakeDataGenerator }) {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 7);

  function pickARandomType() {
    const types = Object.keys(assessmentEnums.types);
    return types[Math.floor(Math.random() * types.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        title: fakeDataGenerator.generateStringOfLength(10),
        type: pickARandomType(),
        startDate,
        endDate,
        description: fakeDataGenerator.generateStringOfLength(30),
        ...initialValues,
      };
    },
  };
};
