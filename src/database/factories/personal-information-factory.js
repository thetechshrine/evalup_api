const commonEnums = require('../enums/common');

module.exports = function buildPersonalInformationFactory({
  fakeDataGenerator,
}) {
  return {
    generate(initialValues = {}) {
      return {
        gender: commonEnums.genders.MALE,
        lastName: fakeDataGenerator.generatePersonName(),
        firstName: fakeDataGenerator.generatePersonName(),
        phone: fakeDataGenerator.generatePhone(),
        birthDate: fakeDataGenerator.generateDate(),
        ...initialValues,
      };
    },

    getValidPhoneSample() {
      return '0101010101';
    },
  };
};
