const studentEnums = require('../enums/student');
const entityValidator = require('../../application/helpers/entity-validator');
const {
  BadRequestError,
  ParameterError,
} = require('../../application/helpers/errors');

module.exports = function buildStudent({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateGender(gender) {
    const personGenders = Object.values(studentEnums.genders);
    if (!gender) {
      throw new ParameterError('Student gender is required');
    }
    if (!personGenders.includes(gender)) {
      throw new BadRequestError(
        `Student gender must be one of [${personGenders}]`
      );
    }
  }

  function validateNationality(nationality) {
    const countriesCodes = Object.keys(studentEnums.countries);
    if (!nationality) {
      throw new ParameterError(`Student country is required`);
    }
    if (!countriesCodes.includes(nationality)) {
      throw new BadRequestError(
        `Student country must be one of ${countriesCodes}`
      );
    }
  }

  function validateLastName(lastName) {
    if (!lastName) {
      throw new ParameterError(`Student last name is required`);
    }
  }

  function validateFirstName(firstName) {
    if (!firstName) {
      throw new ParameterError(`Student first name is required`);
    }
  }

  function validatePhoneNumber(phoneNumber) {
    if (!phoneNumber) {
      throw new ParameterError(`Student phone number is required`);
    }
    const phoneNumberRegex = /^[0]{1}\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      throw new BadRequestError(
        `Student phone number must be of length 9 or 10 with 0 as start`
      );
    }
  }

  return class Student {
    #id;
    #gender;
    #lastName;
    #firstName;
    #nationality;
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
      validateGender(gender);
      validateLastName(lastName);
      validateFirstName(firstName);
      validatePhoneNumber(phone);
      commonDataValidator.validateDate(birthDate);
      validateNationality(nationality);
      entityValidator.validateAccount({ account, required: true });
      entityValidator.validateAddress({ address, required: true });
      entityValidator.validateGroup({ group, required: true });

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
      validateLastName(lastName);
      this.#lastName = lastName;
    }

    get lastName() {
      return this.#lastName;
    }

    set firstName(firstName) {
      validateFirstName(firstName);
      this.#firstName = firstName;
    }

    get firstName() {
      return this.#firstName;
    }

    set phone(phone) {
      validatePhoneNumber(phone);
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
