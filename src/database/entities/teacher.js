const commonEnums = require('../enums/common');
const teacherEnums = require('../enums/teacher');
const entityValidator = require('../../application/helpers/entity-validator');

module.exports = function buildStudent({ commonDataGenerator, commonDataValidator }) {
  function validatetype(type) {
    const types = Object.keys(teacherEnums.types);

    commonDataValidator.validateEnumAsRequired(type, types, 'Teacher type');
  }

  function validateGender(gender) {
    const genders = Object.values(commonEnums.genders);

    commonDataValidator.validateEnumAsRequired(gender, genders, 'Teacher gender');
  }

  function validateLastName(lastName) {
    commonDataValidator.validateStringAsRequired(lastName, 'Teacher lastName');
  }

  function validateFirstName(firstName) {
    commonDataValidator.validateStringAsRequired(firstName, 'Teacher firstName');
  }

  function validateAccount(account, required = false) {
    entityValidator.validateAccount({ account, required, errorPrefix: 'Teacher account' });
  }

  return class Teacher {
    #id;
    #type;
    #gender;
    #lastName;
    #firstName;
    #account;

    constructor({ id, type, gender, lastName, firstName, account } = {}) {
      commonDataValidator.validateId(id);
      validatetype(type);
      validateGender(gender);
      validateLastName(lastName);
      validateFirstName(firstName);
      validateAccount(account);

      this.#id = id;
      this.#type = type;
      this.#gender = gender;
      this.#lastName = lastName;
      this.#firstName = firstName;
      this.#account = account;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set type(type) {
      validatetype(type);
      this.#type = type;
    }

    get type() {
      return this.#type;
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

    set account(account) {
      validateAccount(account);
      this.#account = account;
    }

    get account() {
      return this.#account;
    }

    toJSON() {
      return {
        id: this.#id,
        type: this.#type,
        gender: this.#gender,
        lastName: this.#lastName,
        firstName: this.#firstName,
        account: this.#account ? this.#account.toJSON() : {},
      };
    }

    static newInstance({ id = commonDataGenerator.generateId(), type, gender, lastName, firstName, account } = {}) {
      validateAccount(account, true);

      return new Teacher({
        id,
        type,
        gender,
        lastName,
        firstName,
        account,
      });
    }
  };
};
