const TimeEntity = require('../../application/helpers/time-entity');
const courseResultEnums = require('../enums/course-result');

module.exports = function buildCourseResult({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateObtainedNote(obtainedNote) {
    if (!obtainedNote || obtainedNote < 0) {
      throw new Error('Obtained note parameter must be greater or equal to 0');
    }
  }

  function validateObtainedCredits(obtainedCredits) {
    if (!obtainedCredits || obtainedCredits < 0) {
      throw new Error(
        'Obtained credits parameter must be greater or equal to 0'
      );
    }
  }

  function validateStatus(status) {
    const courseResultStatuses = Object.values(courseResultEnums.statuses);
    if (!courseResultStatuses.includes(status)) {
      throw new Error(
        `Course result status must be one of ${courseResultStatuses}`
      );
    }
  }

  return class CourseResult extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #obtainedNote;
    #obtainedCredits;
    #status;
    #courseId;
    #studentAcademicYearId;

    constructor({ courseId, studentAcademicYearId } = {}) {
      commonDataValidator.validateId(courseId);
      commonDataValidator.validateId(studentAcademicYearId);

      super();
      this.#id = commonDataGenerator.generateId();
      this.#obtainedNote = 0;
      this.#obtainedCredits = 0;
      this.#status = courseResultEnums.statuses.UNAVAILABLE;
      this.#courseId = courseId;
      this.#studentAcademicYearId = studentAcademicYearId;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set obtainedNote(obtainedNote) {
      validateObtainedNote(obtainedNote);
      this.#obtainedNote = obtainedNote;
      this.#updatedAt = Date.now();
    }

    get obtainedNote() {
      return this.#obtainedNote;
    }

    set obtainedCredits(obtainedCredits) {
      validateObtainedCredits(obtainedCredits);
      this.#obtainedCredits = obtainedCredits;
      this.#updatedAt = Date.now();
    }

    get obtainedCredits() {
      return this.#obtainedCredits;
    }

    set status(status) {
      validateStatus(status);
      this.#status = status;
      this.#updatedAt = Date.now();
    }

    get status() {
      return this.#status;
    }

    set courseId(courseId) {
      commonDataValidator.validateId(courseId);
      this.#courseId = courseId;
      this.#updatedAt = Date.now();
    }

    get courseId() {
      return this.#courseId;
    }

    set studentAcademicYearId(studentAcademicYearId) {
      commonDataValidator.validateId(studentAcademicYearId);
      this.#studentAcademicYearId = studentAcademicYearId;
      this.#updatedAt = Date.now();
    }

    get studentAcademicYearId() {
      return this.#studentAcademicYearId;
    }

    toJSON() {
      return {
        id: this.#id,
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        obtainedNote: this.#obtainedNote,
        obtainedCredits: this.#obtainedCredits,
        status: this.#status,
      };
    }
  };
};
