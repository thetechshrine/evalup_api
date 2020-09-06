const TimeEntity = require('../../application/helpers/time-entity');
const assessmentEnums = require('../enums/assessment');

module.exports = function buildAssessment({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateType(type) {
    const assessmentResultTypes = Object.values(assessmentEnums.types);
    if (!assessmentResultTypes.includes(type)) {
      throw new Error(
        `Assessment type must be one of ${assessmentResultTypes}`
      );
    }
  }

  function validateDatesConformity(startDate, endDate) {
    if (!startDate || new Date(startDate) >= new Date(endDate)) {
      throw new Error('Start parameter is invalid or is later than end date');
    }
  }

  function validateTitle(title) {
    if (!title) throw new Error('Title parameter is required');
  }

  function validateAssetsIds(assetsIds) {
    if (!assetsIds || !Array.isArray(assetsIds) || assetsIds.length === 0) {
      throw new Error('Assets ids must be an array of at leat one element');
    }
    assetsIds.forEach((assetId) => {
      commonDataValidator.validateId(assetId);
    });
  }

  return class Assessment extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #type;
    #title;
    #description;
    #startDate;
    #endDate;
    #teacherId;
    #assetsIds;

    constructor({
      type,
      title,
      description,
      startDate,
      endDate,
      teacherId,
      assetsIds,
    } = {}) {
      validateType(type);
      validateTitle(title);
      commonDataValidator.validateDate(startDate);
      commonDataValidator.validateDate(endDate);
      validateDatesConformity(startDate, endDate);
      commonDataValidator.validateId(teacherId);
      validateAssetsIds(assetsIds);

      super();
      this.#id = commonDataGenerator.generateId();
      this.#type = type;
      this.#description = description;
      this.#startDate = startDate;
      this.#endDate = endDate;
      this.#teacherId = teacherId;
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

    set startDate(startDate) {
      validateDatesConformity(startDate, this.#endDate);
      this.#startDate = startDate;
    }

    get startDate() {
      return this.#startDate;
    }

    set endDate(endDate) {
      validateDatesConformity(this.#startDate, endDate);
      this.#endDate = endDate;
    }

    get endDate() {
      return this.#endDate;
    }

    set teacherId(teacherId) {
      commonDataValidator.validateId(teacherId);
      this.#teacherId = teacherId;
    }

    get teacherId() {
      return this.#teacherId;
    }

    set assetsIds(assetsIds) {
      validateAssetsIds(assetsIds);
      this.#assetsIds = assetsIds;
    }

    get assetsIds() {
      return this.#assetsIds;
    }

    toJSON() {
      return {
        id: this.#id,
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        type: this.#type,
        title: this.#title,
        description: this.#description,
        startDate: this.#startDate,
        endDate: this.#endDate,
      };
    }
  };
};
