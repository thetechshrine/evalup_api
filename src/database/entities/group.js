const { ParameterError } = require('../../application/helpers/errors');

module.exports = function buildCourse({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateCode(code) {
    if (!code) {
      throw new ParameterError('Group code is required');
    }
  }

  function validateTitle(title) {
    if (!title) {
      throw new ParameterError('Group title is required');
    }
  }

  return class Group {
    #id;
    #code;
    #title;
    #description;

    constructor({
      id = commonDataGenerator.generateId(),
      code,
      title,
      description,
    } = {}) {
      commonDataValidator.validateId(id);
      validateCode(code);
      validateTitle(title);

      this.#id = id;
      this.#code = code;
      this.#title = title;
      this.#description = description;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set code(code) {
      this.#code = code;
    }

    get code() {
      return this.#code;
    }

    set title(title) {
      this.#title = title;
    }

    get title() {
      return this.#title;
    }

    set description(description) {
      this.#description = description;
    }

    get description() {
      return this.#description;
    }

    toJSON() {
      return {
        id: this.#id,
        code: this.#code,
        title: this.#title,
        description: this.#description,
      };
    }
  };
};
