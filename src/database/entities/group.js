module.exports = function buildCourse({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateCode(code) {
    if (!code) {
      throw new Error('code parameter is mandatory');
    }
  }

  return class Group {
    #id;
    #code;
    #description;

    constructor({
      id = commonDataGenerator.generateId(),
      code,
      description,
    } = {}) {
      commonDataValidator.validateId(id);
      validateCode(code);

      this.#id = id;
      this.#code = code;
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
        description: this.#description,
      };
    }
  };
};
