const studentEnums = require('../enums/student');
const entityValidator = require('../../application/helpers/entity-validator');

module.exports = function buildStudent({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateGender(gender) {
    const personGenders = Object.values(studentEnums.genders);
    if (!gender || !personGenders.includes(gender)) {
      throw new Error(`Gender must be one of ${personGenders}`);
    }
  }

  function validateNationality(nationality) {
    const countriesCodes = Object.keys(studentEnums.countries);
    if (!nationality || !countriesCodes.includes(nationality))
      throw new Error(`Country must be one of ${countriesCodes}`);
  }

  return class Student {
    #id;
    #nationality;
    #gender;
    #lastName;
    #firstName;
    #phone;
    #birthDate;
    #account;
    #address;
    #group;

    constructor({
      id = commonDataGenerator.generateId(),
      gender,
      lastName,
      firstName,
      phone,
      birthDate,
      nationality,
      account,
      address,
      group,
    }) {
      commonDataValidator.validateId(id);
      commonDataValidator.validatePersonName(lastName);
      commonDataValidator.validatePersonName(firstName);
      commonDataValidator.validatePhoneNumber(phone);
      commonDataValidator.validateDate(birthDate);
      validateNationality(nationality);
      entityValidator.validateAccount({ account });
      entityValidator.validateAddress({ address });
      entityValidator.validateGroup({ group });

      this.#id = id;
      this.#gender = gender;
      this.#lastName = lastName;
      this.#firstName = firstName;
      this.#phone = phone;
      this.#birthDate = birthDate;
      this.#nationality = nationality;
      this.#account = account;
      this.#address = address;
      this.#group = group;

      Object.seal(this);
    }

    get id() {
      return this.#id;
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

    set nationality(nationality) {
      validateNationality(nationality);
      this.#nationality = nationality;
    }

    get nationality() {
      return this.#nationality;
    }

    set account(account) {
      entityValidator.validateAccount({ account, required: true });
      this.#account = account;
    }

    get account() {
      return this.#account;
    }

    set address(address) {
      entityValidator.validateAddress({ address, required: true });
      this.#address = address;
    }

    get address() {
      return this.#address;
    }

    set group(group) {
      entityValidator.validateGroup({ group, required: true });
      this.#group = group;
    }

    get group() {
      return this.#group;
    }

    toJSON() {
      return {
        id: this.#id,
        gender: this.#gender,
        lastName: this.#lastName,
        firstName: this.#firstName,
        phone: this.#phone,
        birthDate: this.#birthDate,
        nationality: this.#nationality,
        account: this.#account.toJSON(),
        address: this.#address.toJSON(),
        group: this.#group.toJSON(),
      };
    }
  };
};
