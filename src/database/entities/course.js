const TimeEntity = require('../../application/helpers/time-entity');
const entityValidator = require('../../application/helpers/entity-validator');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildCourse({ commonDataGenerator, commonDataValidator }) {
  function validateCode(code) {
    commonDataValidator.validateStringAsRequired(code, 'Course code');
  }

  function validateTitle(title) {
    commonDataValidator.validateStringAsRequired(title, 'Course title');
  }

  function validateCredits(credits) {
    commonDataValidator.validateNumberAsRequired(credits, 'Course credits');

    if (credits <= 0) throw new BadRequestError(`Course credits must be greater than 0`);
  }

  function validateSuccessNote(successNote) {
    commonDataValidator.validateNumberAsRequired(successNote, 'Course successNote');

    if (successNote <= 0) throw new BadRequestError(`Course successNote must be greater than 0`);
  }

  function validateDescription(description) {
    commonDataValidator.validateString(description, 'Course description');
  }

  function validateGroup(group, required = false) {
    entityValidator.validateGroup({ group, required, errorPrefix: 'Course group' });
  }

  return class Course extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #code;
    #title;
    #description;
    #credits;
    #successNote;
    #group;

    constructor({ id, code, title, description, credits, successNote, group, createdAt, updatedAt } = {}) {
      super();

      commonDataValidator.validateIdAsRequired(id, 'Course id');
      validateCode(code);
      validateTitle(title);
      validateCredits(credits);
      validateSuccessNote(successNote);
      validateDescription(description);
      validateGroup(group);
      commonDataValidator.validateDateAsRequired(createdAt, 'Course createdAt');
      commonDataValidator.validateDateAsRequired(updatedAt, 'Course updatedAt');

      this.#id = id;
      this.#code = code.toUpperCase();
      this.#title = title;
      this.#description = description;
      this.#credits = credits;
      this.#successNote = successNote;
      this.#group = group;
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
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        code: this.#code,
        title: this.#title,
        description: this.#description,
        credits: this.#credits,
        successNote: this.#successNote,
        group: this.#group ? this.#group.toJSON() : {},
      };
    }

    static newInstance({
      id = commonDataGenerator.generateId(),
      code,
      title,
      description,
      credits,
      successNote,
      group,
      createdAt = Date.now(),
      updatedAt = Date.now(),
    } = {}) {
      validateGroup(group, true);

      return new Course({
        id,
        code,
        title,
        description,
        credits,
        successNote,
        group,
        createdAt,
        updatedAt,
      });
    }
  };
};
