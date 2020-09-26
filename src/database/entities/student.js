const commonEnums = require('../enums/common');
const studentEnums = require('../enums/student');
const entityValidator = require('../../application/helpers/entity-validator');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildStudent({ commonDataGenerator, commonDataValidator }) {
  function validateGender(gender) {
    const genders = Object.values(commonEnums.genders);

    commonDataValidator.validateEnumAsRequired(gender, genders, 'Student gender');
  }

  function validateNationality(nationality) {
    const countriesCodes = Object.keys(studentEnums.countries);

    commonDataValidator.validateEnumAsRequired(nationality, countriesCodes, 'Student nationality');
  }

  function validateLastName(lastName) {
    commonDataValidator.validateStringAsRequired(lastName, 'Student lastName');
  }

  function validateFirstName(firstName) {
    commonDataValidator.validateStringAsRequired(firstName, 'Student firstName');
  }

  function validatePhoneNumber(phoneNumber) {
    commonDataValidator.validateStringAsRequired(phoneNumber, 'Student phoneNumber');

    const phoneNumberRegex = /^[0]{1}\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) throw new BadRequestError(`Student phoneNumber must be of length 9 or 10 with 0 as start`);
  }

  function validateBirthdate(birthDate) {
    commonDataValidator.validateDateAsRequired(birthDate, 'Student birthDate');
  }

  function validateAddress(address, required = false) {
    entityValidator.validateAddress({ address, required, errorPrefix: 'Student address' });
  }

  function validateAccount(account, required = false) {
    entityValidator.validateAccount({ account, required, errorPrefix: 'Student account' });
  }

  function validateGroup(group, required = false) {
    entityValidator.validateGroup({ group, required, errorPrefix: 'Student group' });
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

    constructor({ id = commonDataGenerator.generateId(), gender, lastName, firstName, phone, birthDate, nationality, account, address, group } = {}) {
      commonDataValidator.validateIdAsRequired(id, 'Student id');
      validateGender(gender);
      validateLastName(lastName);
      validateFirstName(firstName);
      validatePhoneNumber(phone);
      validateBirthdate(birthDate);
      validateNationality(nationality);
      validateAccount(account);
      validateAddress(address);
      validateGroup(group);

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
      validateBirthdate(birthDate);
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
      validateAccount(account);
      this.#account = account;
    }

    get account() {
      return this.#account;
    }

    set address(address) {
      validateAddress(address);
      this.#address = address;
    }

    get address() {
      return this.#address;
    }

    set group(group) {
      validateGroup(group, true);
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
        account: this.#account ? this.#account.toJSON() : {},
        address: this.#address ? this.#address.toJSON() : {},
        group: this.#group ? this.#group.toJSON() : {},
      };
    }

    static newInstance({
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
    } = {}) {
      validateAccount(account, true);
      validateAddress(address, true);
      validateGroup(group, true);

      return new Student({ id, gender, lastName, firstName, phone, birthDate, nationality, account, address, group });
    }
  };
};
