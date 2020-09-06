module.exports = function buildCourse({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateCode(code) {
    if (!code) {
      throw new Error('Code parameter is required');
    }
  }

  function validateTitle(title) {
    if (!title) {
      throw new Error('Title parameter is required');
    }
  }

  function validateCredits(credits) {
    if (!credits || credits <= 0) {
      throw new Error(`Credits parameter must be greater than 0`);
    }
  }

  function validateSuccessNote(successNote) {
    if (!successNote || successNote <= 0) {
      throw new Error(`Success note parameter must be greater than 0`);
    }
  }

  return class Course {
    #id;
    #code;
    #title;
    #description;
    #credits;
    #successNote;
    #groupId;

    constructor({
      code,
      title,
      description,
      credits,
      successNote,
      groupId,
    } = {}) {
      validateCode(code);
      validateTitle(title);
      validateCredits(credits);
      validateSuccessNote(successNote);
      commonDataValidator.validateId(groupId);

      this.#id = commonDataGenerator.generateId();
      this.#code = code;
      this.#title = title;
      this.#description = description;
      this.#credits = credits;
      this.#successNote = successNote;

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

    set groupId(groupId) {
      commonDataValidator.validateId(groupId);
      this.#groupId = groupId;
    }

    get groupId() {
      return this.#groupId;
    }

    toJSON() {
      return {
        id: this.#id,
        code: this.#code,
        title: this.#title,
        description: this.#description,
        credits: this.#credits,
        successNote: this.#successNote,
      };
    }
  };
};
