module.exports = function buildCourse({ commonDataGenerator }) {
  function validateCode(code) {
    if (!code) {
      throw new Error('Code parameter is required');
    }
  }

  return class Group {
    #id;
    #code;
    #description;

    constructor({ code, description } = {}) {
      validateCode(code);

      this.#id = commonDataGenerator.generateId();
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
