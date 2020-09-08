const studentEnums = require('../enums/student');

module.exports = function buildStudentFactory({ fakeDataGenerator }) {
  function pickARandomCountryCode() {
    const countriesCodes = Object.keys(studentEnums.countries);
    return countriesCodes[Math.floor(Math.random() * countriesCodes.length)];
  }

  function pickARandomGender() {
    const genders = Object.keys(studentEnums.genders);
    return genders[Math.floor(Math.random() * genders.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        gender: pickARandomGender(),
        lastName: fakeDataGenerator.generatePersonName(),
        firstName: fakeDataGenerator.generatePersonName(),
        nationality: pickARandomCountryCode(),
        birthDate: fakeDataGenerator.generateDate(),
        phone: fakeDataGenerator.generatePhoneNumber(),
        ...initialValues,
      };
    },
  };
};
