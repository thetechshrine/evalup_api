const TimeEntity = require('../../application/helpers/time-entity');
const assessmentEnums = require('../enums/assessment');
const entityValidator = require('../../application/helpers/entity-validator');
const assetUtils = require('../../application/helpers/asset-utils');

module.exports = function buildAssessment({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateType(type) {
    const assessmentResultTypes = Object.values(assessmentEnums.types);
    if (!assessmentResultTypes.includes(type)) {
      throw new Error(`type must be one of ${assessmentResultTypes}`);
    }
  }

  function validateDatesConformity(startDate, endDate) {
    if (!startDate || new Date(startDate) >= new Date(endDate)) {
      throw new Error(
        'startDate parameter must not be equal or later than endDate'
      );
    }
  }

  function validateTitle(title) {
    if (!title) throw new Error('title parameter is mandatory');
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
    #teacher;
    #course;
    #group;
    #assets;

    constructor({
      id = commonDataGenerator.generateId(),
      type,
      title,
      description,
      startDate,
      endDate,
      teacher,
      course,
      group,
      assets,
      createdAt,
      updatedAt,
    } = {}) {
      commonDataValidator.validateId(id);
      validateType(type);
      validateTitle(title);
      commonDataValidator.validateDate(startDate);
      commonDataValidator.validateDate(endDate);
      validateDatesConformity(startDate, endDate);
      entityValidator.validateTeacher({ teacher });
      entityValidator.validateGroup({ group });
      entityValidator.validateCourse({ course });
      assetUtils.validateAssets({ assets, required: true });

      super();
      this.#id = id;
      this.#type = type;
      this.#description = description;
      this.#startDate = startDate;
      this.#endDate = endDate;
      this.#teacher = teacher;
      this.#group = group;
      this.#course = course;
      this.#createdAt = createdAt;
      this.#updatedAt = updatedAt;

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

    set teacher(teacher) {
      entityValidator.validateTeacher({ teacher, required: true });
      this.#teacher = teacher;
    }

    get teacher() {
      return this.#teacher;
    }

    set course(course) {
      entityValidator.validateCourse({ course, required: true });
      this.#course = course;
    }

    get course() {
      return this.#course;
    }

    set group(group) {
      entityValidator.validateGroup({ group, required: true });
      this.#group = group;
    }

    get group() {
      return this.#group;
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
        type: this.#type,
        title: this.#title,
        description: this.#description,
        startDate: this.#startDate,
        endDate: this.#endDate,
        teacher: this.#teacher.toJSON(),
        course: this.#course.toJSON(),
        group: this.#group.toJSON(),
        asset: assetUtils.parseAssetsToJSONArray(this.#assets),
      };
    }
  };
};
