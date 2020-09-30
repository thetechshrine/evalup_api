const TimeEntity = require('../../application/helpers/time-entity');

module.exports = function buildCourse({ commonDataGenerator, commonDataValidator }) {
  function validateCode(code) {
    commonDataValidator.validateStringAsRequired(code, 'Group code');
  }

  function validateTitle(title) {
    commonDataValidator.validateStringAsRequired(title, 'Group title');
  }

  function validateDescription(description) {
    commonDataValidator.validateString(description, 'Group description');
  }

  return class Group extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #code;
    #title;
    #description;

    constructor({ id, code, title, description, createdAt, updatedAt } = {}) {
      super();

      commonDataValidator.validateIdAsRequired(id, 'Group id');
      validateCode(code);
      validateTitle(title);
      validateDescription(description);
      commonDataValidator.validateDateAsRequired(createdAt, 'Group createdAt');
      commonDataValidator.validateDateAsRequired(updatedAt, 'Group updatedAt');

      this.#id = id;
      this.#code = code.toUpperCase();
      this.#title = title;
      this.#description = description;
      this.#createdAt = createdAt;
      this.#updatedAt = updatedAt;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set code(code) {
      validateCode(code);
      this.#code = code.toUpperCase();
    }

    get code() {
      return this.#code;
    }

    set title(title) {
      validateTitle(title);
      this.#title = title;
    }

    get title() {
      return this.#title;
    }

    set description(description) {
      validateDescription(description);
      this.#description = description;
    }

    get description() {
      return this.#description;
    }

    toJSON() {
      return {
        id: this.#id,
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        code: this.#code,
        title: this.#title,
        description: this.#description,
      };
    }

    static newInstance({ id = commonDataGenerator.generateId(), code, title, description, createdAt = Date.now(), updatedAt = Date.now() } = {}) {
      return new Group({ id, code, title, description, createdAt, updatedAt });
    }
  };
};
