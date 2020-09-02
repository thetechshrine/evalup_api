const TimeEntity = require('../../application/helpers/time-entity');
const assessmentResultEnums = require('../enums/assessment-result');
const assessmentEnums = require('../enums/assessment');

module.exports = function buildAssessmentResult({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateStatus(status) {
    const assessmentResultStatuses = Object.values(
      assessmentResultEnums.statuses
    );
    if (!assessmentResultStatuses.includes(status)) {
      throw new Error(
        `Assessment result status must be one of ${assessmentResultStatuses}`
      );
    }
  }

  function validateType(type) {
    const assessmentResultTypes = Object.values(assessmentEnums.types);
    if (!assessmentResultTypes.includes(type)) {
      throw new Error(
        `Assessment result type must be one of ${assessmentResultTypes}`
      );
    }
  }

  function validateObtainedNote(obtainedNote) {
    if (!obtainedNote || obtainedNote < 0) {
      throw new Error('Obtained note parameter must be greater or equal to 0');
    }
  }

  function validateObtainedCredits(obtainedCredits) {
    if (!obtainedCredits || obtainedCredits <= 0) {
      throw new Error(
        'Obtained credits parameter must be greater or equal to 0'
      );
    }
  }

  function validateAssetsIds(assetsIds) {
    if (!assetsIds || !Array.isArray(assetsIds) || assetsIds.length === 0) {
      throw new Error('Assets ids must be an array of at leat one element');
    }
    assetsIds.forEach((assetId) => {
      commonDataValidator.validateId(assetId);
    });
  }

  return class AssessmentResult extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #type;
    #obtainedNote;
    #obtainedCredits;
    #status;
    #comments;
    #courseResultId;
    #assessmentId;
    #assetsIds;

    constructor({
      type,
      comments,
      courseResultId,
      assessmentId,
      assetsIds,
    } = {}) {
      validateType(type);
      commonDataValidator.validateId(courseResultId);
      commonDataValidator.validateId(assessmentId);
      validateAssetsIds(assetsIds);

      super();
      this.#id = commonDataGenerator.generateId();
      this.#type = type;
      this.#obtainedNote = 0;
      this.#obtainedCredits = 0;
      this.#comments = comments;
      this.#status = assessmentResultEnums.statuses.PENDING;
      this.#courseResultId = courseResultId;
      this.#assessmentId = assessmentId;
      this.#assetsIds = assetsIds;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set type(type) {
      validateType(type);
      this.#type = type;
      this.#updatedAt = Date.now();
    }

    get type() {
      return this.#type;
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

    set comments(comments) {
      this.#comments = comments;
    }

    get comments() {
      return this.#comments;
    }

    set status(status) {
      validateStatus(status);
      this.#status = status;
      this.#updatedAt = Date.now();
    }

    get status() {
      return this.#status;
    }

    set courseResultId(courseResultId) {
      commonDataValidator.validateId(courseResultId);
      this.#courseResultId = courseResultId;
      this.#updatedAt = Date.now();
    }

    get courseResultId() {
      return this.#courseResultId;
    }

    set assessmentId(assessmentId) {
      commonDataValidator.validateId(assessmentId);
      this.#assessmentId = assessmentId;
      this.#updatedAt = Date.now();
    }

    get assessmentId() {
      return this.#assessmentId;
    }

    set assetsIds(assetsIds) {
      commonDataValidator.validateId(assetsIds);
      this.#assetsIds = assetsIds;
      this.#updatedAt = Date.now();
    }

    get assetsIds() {
      return this.#assetsIds;
    }

    toJSON() {
      return {
        id: this.#id,
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        obtainedNote: this.#obtainedNote,
        obtainedCredits: this.#obtainedCredits,
        comments: this.#comments,
        status: this.#status,
        type: this.#type,
      };
    }
  };
};
