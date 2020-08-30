const commonEnums = require('../enums/common');

module.exports = function buildPersonalInformation({ commonDataValidator }) {
  function validateGender(gender) {
    const personGenders = Object.values(commonEnums.genders);
    if (!gender || !personGenders.includes(gender)) {
      throw new Error(`Gender must be one of [${personGenders}]`);
    }
  }

  return class PersonalInformation {
    #gender;
    #lastName;
    #firstName;
    #phone;
    #birthDate;

    constructor({ gender, lastName, firstName, phone, birthDate } = {}) {
      validateGender(gender);
      commonDataValidator.validatePersonName(lastName);
      commonDataValidator.validatePersonName(firstName);
      commonDataValidator.validatePhoneNumber(phone);
      commonDataValidator.validateDate(birthDate);

      this.#gender = gender;
      this.#lastName = lastName;
      this.#firstName = firstName;
      this.#phone = phone;
      this.#birthDate = birthDate;

      Object.seal(this);
    }

    set gender(gender) {
      validateGender(gender);
      this.#gender = gender;
    }

    get gender() {
      return this.#gender;
    }

    set lastName(lastName) {
      commonDataValidator.validatePersonName(lastName);
      this.#lastName = lastName;
    }

    get lastName() {
      return this.#lastName;
    }

    set firstName(firstName) {
      commonDataValidator.validatePersonName(firstName);
      this.#firstName = firstName;
    }

    get firstName() {
      return this.#firstName;
    }

    set phone(phone) {
      commonDataValidator.validatePhoneNumber(phone);
      this.#phone = phone;
    }

    get phone() {
      return this.#phone;
    }

    set birthDate(birthDate) {
      commonDataValidator.validateDate(birthDate);
      this.#birthDate = birthDate;
    }

    get birthDate() {
      return this.#birthDate;
    }

    toJSON() {
      return {
        gender: this.#gender,
        lastName: this.#lastName,
        firstName: this.#firstName,
        phone: this.#phone,
        birthDate: this.#birthDate,
      };
    }
  };
};
