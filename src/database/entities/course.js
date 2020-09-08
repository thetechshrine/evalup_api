const entityValidator = require('../../application/helpers/entity-validator');

module.exports = function buildCourse({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateCode(code) {
    if (!code) {
      throw new Error('code parameter is required');
    }
  }

  function validateTitle(title) {
    if (!title) {
      throw new Error('title parameter is required');
    }
  }

  function validateCredits(credits) {
    if (!credits || credits <= 0) {
      throw new Error(`credits parameter must be greater than 0`);
    }
  }

  function validateSuccessNote(successNote) {
    if (!successNote || successNote <= 0) {
      throw new Error(`successNote parameter must be greater than 0`);
    }
  }

  return class Course {
    #id;
    #code;
    #title;
    #description;
    #credits;
    #successNote;
    #group;

    constructor({
      id = commonDataGenerator.generateId(),
      code,
      title,
      description,
      credits,
      successNote,
      group,
    } = {}) {
      commonDataValidator.validateId(id);
      validateCode(code);
      validateTitle(title);
      validateCredits(credits);
      validateSuccessNote(successNote);
      entityValidator.validateGroup({ group });

      this.#id = id;
      this.#code = code;
      this.#title = title;
      this.#description = description;
      this.#credits = credits;
      this.#successNote = successNote;
      this.#group = group;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set code(code) {
      validateCode(code);
      this.#code = code;
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
      this.#description = description;
    }

    get description() {
      return this.#description;
    }

    set credits(credits) {
      validateCredits(credits);
      this.#credits = credits;
    }

    get credits() {
      return this.#credits;
    }

    set successNote(successNote) {
      validateSuccessNote(successNote);
      this.#successNote = successNote;
    }

    get successNote() {
      return this.#successNote;
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
        code: this.#code,
        title: this.#title,
        description: this.#description,
        credits: this.#credits,
        successNote: this.#successNote,
        group: this.#group.toJSON(),
      };
    }
  };
};
