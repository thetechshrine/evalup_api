const { getDefaultProperties } = require('../../application/helpers/factory-utils');
const commonEnums = require('../enums/common');
const studentEnums = require('../enums/student');

module.exports = function buildStudentFactory({ fakeDataGenerator }) {
  function pickARandomCountryCode() {
    const countriesCodes = Object.keys(studentEnums.countries);
    return countriesCodes[Math.floor(Math.random() * countriesCodes.length)];
  }

  function pickARandomGender() {
    const genders = Object.keys(commonEnums.genders);
    return genders[Math.floor(Math.random() * genders.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        ...getDefaultProperties(fakeDataGenerator),
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
