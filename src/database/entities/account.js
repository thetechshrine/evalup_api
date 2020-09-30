const TimeEntity = require('../../application/helpers/time-entity');
const accountEnums = require('../enums/account');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildAccount({ commonDataGenerator, commonDataValidator }) {
  function validatePassword(password) {
    commonDataValidator.validateStringAsRequired(password, 'Account password');

    if (password.length < 4) throw new BadRequestError('Account password must include at least 4 characters');
  }

  function validateRole(role) {
    const roles = Object.values(accountEnums.roles);
    commonDataValidator.validateEnumAsRequired(role, roles, 'Account role');
  }

  function validateEmail(email) {
    commonDataValidator.validateEmailAsRequired(email, 'Account email');
  }

  function validateActive(active) {
    commonDataValidator.validateBooleanAsRequired(active, 'Account active parameter');
  }

  return class Account extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #email;
    #password;
    #role;
    #active;

    constructor({ id, email, password, role, active, createdAt, updatedAt } = {}) {
      super();

      commonDataValidator.validateIdAsRequired(id, 'Account id');
      validateEmail(email);
      validateRole(role);
      validateActive(active);
      commonDataValidator.validateDateAsRequired(createdAt, 'Account createdAt');
      commonDataValidator.validateDateAsRequired(updatedAt, 'Account updatedAt');

      this.#id = id;
      this.#email = email;
      this.#password = password;
      this.#role = role;
      this.#active = active;
      this.#createdAt = createdAt;
      this.#updatedAt = updatedAt;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set email(email) {
      validateEmail(email);
      this.#email = email;
      this.#updatedAt = Date.now();
    }

    get email() {
      return this.#email;
    }

    set password(password) {
      validatePassword(password);
      this.#password = password;
      this.#updatedAt = Date.now();
    }

    get password() {
      return this.#password;
    }

    set role(role) {
      validateRole(role);
      this.#role = role;
      this.#updatedAt = Date.now();
    }

    get role() {
      return this.#role;
    }

    set active(active) {
      validateActive(active);
      this.#active = active;
      this.#updatedAt = Date.now();
    }

    get active() {
      return this.#active;
    }

    toJSON() {
      return {
        id: this.#id,
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        password: this.#password,
        email: this.#email,
        role: this.#role,
        active: this.#active,
      };
    }

    static newInstance({
      id = commonDataGenerator.generateId(),
      email,
      password,
      role,
      active = false,
      createdAt = Date.now(),
      updatedAt = Date.now(),
    } = {}) {
      return new Account({ id, email, password, role, active, createdAt, updatedAt });
    }
  };
};
