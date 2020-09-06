const TimeEntity = require('../../application/helpers/time-entity');
const assessmentResultEnums = require('../enums/assessment-result');
const entityValidator = require('../../application/helpers/entity-validator');
const assetUtils = require('../../application/helpers/asset-utils');

module.exports = function buildAssessmentResult({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateStatus(status) {
    const assessmentResultStatuses = Object.values(
      assessmentResultEnums.statuses
    );
    if (!assessmentResultStatuses.includes(status)) {
      throw new Error(`status must be one of ${assessmentResultStatuses}`);
    }
  }

  function validateObtainedNote(obtainedNote) {
    if (!obtainedNote || obtainedNote < 0) {
      throw new Error('obtainedNote parameter must be greater or equal to 0');
    }
  }

  function validateObtainedCredits(obtainedCredits) {
    if (!obtainedCredits || obtainedCredits <= 0) {
      throw new Error(
        'obtainedCredits parameter must be greater or equal to 0'
      );
    }
  }

  return class AssessmentResult extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #obtainedNote;
    #obtainedCredits;
    #status;
    #comments;
    #assessment;
    #student;
    #assets;

    constructor({
      id = commonDataGenerator.generateId(),
      obtainedNote = 0,
      obtainedCredits = 0,
      status = assessmentResultEnums.statuses.CREATED,
      comments,
      assessment,
      student,
      assets,
      createdAt,
      updatedAt,
    } = {}) {
      commonDataValidator.validateId(id);
      entityValidator.validateAssessment({ assessment });
      entityValidator.validateStudent({ student });
      assetUtils.validateAssets({ assets, required: true });

      super();
      this.#id = id;
      this.#obtainedNote = obtainedNote;
      this.#obtainedCredits = obtainedCredits;
      this.#comments = comments;
      this.#status = status;
      this.#assessment = assessment;
      this.#student = student;
      this.#createdAt = createdAt;
      this.#updatedAt = updatedAt;

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

    set assessment(assessment) {
      entityValidator.validateAssessment({ assessment, required: true });
      this.#assessment = assessment;
    }

    get assessment() {
      return this.#assessment;
    }

    set student(student) {
      entityValidator.validateStudent({ student, required: true });
      this.#student = student;
    }

    get student() {
      return this.#student;
    }

    set assets(assets) {
      assetUtils.validateAssets({ assets, required: true });
      this.#assets = assets;
    }

    get assets() {
      return this.#assets;
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
        assessment: this.#assessment.toJSON(),
        student: this.#student.toJSON(),
        assets: assetUtils.parseAssetsToJSONArray(this.#assets),
      };
    }
  };
};
