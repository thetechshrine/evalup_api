const TimeEntity = require('../../application/helpers/time-entity');
const assessmentResultEnums = require('../enums/assessment-result');
const entityValidator = require('../../application/helpers/entity-validator');
const assetUtils = require('../../application/helpers/asset-utils');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildAssessmentResult({ commonDataGenerator, commonDataValidator }) {
  function validateStatus(status) {
    const assessmentResultStatuses = Object.values(assessmentResultEnums.statuses);

    commonDataValidator.validateEnumAsRequired(status, assessmentResultStatuses, 'Assessment result status');
  }

  function validateObtainedNote(obtainedNote) {
    commonDataValidator.validateNumberAsRequired(obtainedNote, 'Assessment result obtainedNote');

    if (obtainedNote < 0 || obtainedNote > 20) throw new BadRequestError('Assessment result obtainedNote must be between 0 and 20');
  }

  function validateObtainedCredits(obtainedCredits) {
    commonDataValidator.validateNumberAsRequired(obtainedCredits, 'Assessment result obtainedCredits');

    if (obtainedCredits < 0) throw new BadRequestError('Assessment result obtainedCredits must be greater or equal to 0');
  }

  function validateComments(comments) {
    commonDataValidator.validateString(comments, 'Assessment result comments');
  }

  function validateAssets(assets) {
    const assetsArrayMinLength = 1;
    commonDataValidator.validateArrayAsRequired(assets, assetsArrayMinLength, 'Assessement result assets');

    assetUtils.validateAssets({ assets, required: true });
  }

  function validateAssessment(assessment, required = false) {
    entityValidator.validateAssessment({ assessment, required, errorPrefix: 'Assessment result assessment' });
  }

  function validateStudent(student, required = false) {
    entityValidator.validateStudent({ student, required, errorPrefix: 'Assessment result student' });
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

    constructor({ id, obtainedNote, obtainedCredits, status, comments, assessment, student, assets, createdAt, updatedAt } = {}) {
      super();

      commonDataValidator.validateIdAsRequired(id, 'Assessment id');
      validateObtainedNote(obtainedNote);
      validateObtainedCredits(obtainedCredits);
      validateStatus(status);
      validateComments(comments);
      validateAssessment(assessment);
      validateStudent(student);
      validateAssets(assets);
      commonDataValidator.validateDateAsRequired(createdAt, 'Assessment result createdAt');
      commonDataValidator.validateDateAsRequired(updatedAt, 'Assessment result updatedAt');

      this.#id = id;
      this.#obtainedNote = obtainedNote;
      this.#obtainedCredits = obtainedCredits;
      this.#comments = comments;
      this.#status = status;
      this.#assets = assets;
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
      validateComments(comments);
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
      validateAssessment(assessment, true);
      this.#assessment = assessment;
    }

    get assessment() {
      return this.#assessment;
    }

    set student(student) {
      validateStudent(student, true);
      this.#student = student;
    }

    get student() {
      return this.#student;
    }

    set assets(assets) {
      validateAssets(assets);
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
        assessment: this.#assessment !== null ? this.#assessment.toJSON() : {},
        student: this.#student ? this.#student.toJSON() : {},
        assets: assetUtils.parseAssetsToJSONArray(this.#assets),
      };
    }

    static newInstance({
      id = commonDataGenerator.generateId(),
      obtainedNote = 0,
      obtainedCredits = 0,
      status = assessmentResultEnums.statuses.CREATED,
      comments,
      assessment,
      student,
      assets,
      createdAt = Date.now(),
      updatedAt = Date.now(),
    } = {}) {
      validateStudent(student, true);
      validateAssessment(assessment, true);

      return new AssessmentResult({
        id,
        obtainedNote,
        obtainedCredits,
        status,
        comments,
        assessment,
        student,
        assets,
        createdAt,
        updatedAt,
      });
    }
  };
};
