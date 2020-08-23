const commonEnums = require('../enums/common');

module.exports = function buildPersonalInformation({ commonDataValidator }) {
  function validateGender(gender) {
    const personGenders = Object.values(commonEnums.genders);
    if (!gender || !personGenders.includes(gender)) {
      throw new Error(`Gender must be one of [${personGenders}]`);
    }
  }

  return class PersonalInformation {
    constructor({ gender, lastName, firstName, phone, birthDate } = {}) {
      validateGender(gender);
      commonDataValidator.validatePersonName(lastName);
      commonDataValidator.validatePersonName(firstName);
      commonDataValidator.validatePhoneNumber(phone);
      commonDataValidator.validateDate(birthDate);

      this.gender = gender;
      this.lastName = lastName;
      this.firstName = firstName;
      this.phone = phone;
      this.birthDate = birthDate;
    }
  };
};
