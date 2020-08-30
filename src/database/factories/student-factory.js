const studentEnums = require('../enums/student');

module.exports = function buildStudentFactory({ fakeDataGenerator }) {
  function pickARandomCountryCode() {
    const countriesCodes = Object.keys(studentEnums.countries);
    return countriesCodes[Math.floor(Math.random() * countriesCodes.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        nationality: pickARandomCountryCode(),
        addressId: fakeDataGenerator.generateId(),
        accountId: fakeDataGenerator.generateId(),
        ...initialValues,
      };
    },
  };
};
