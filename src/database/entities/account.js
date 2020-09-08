const TimeEntity = require('../../application/helpers/time-entity');
const accountEnums = require('../enums/account');

module.exports = function buildAccount({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validatePassword(password) {
    if (!password || password.length < 4) {
      throw new Error('Password must include at least 4 characters');
    }
  }

  function validateRole(role) {
    const accountRoles = Object.values(accountEnums.roles);
    if (!role || !accountRoles.includes(role)) {
      throw new Error(`Role must be one of [${accountRoles}]`);
    }
  }

  return class Account extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #email;
    #password;
    #role;
    #active;

    constructor({
      id = commonDataGenerator.generateId(),
      email,
      password,
      role,
      active = true,
      createdAt,
      updatedAt,
    } = {}) {
      commonDataValidator.validateId(id);
      commonDataValidator.validateEmail(email);
      validatePassword(password);
      validateRole(role);

      super();
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
      commonDataValidator.validateEmail(email);
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
  };
};
