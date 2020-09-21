const TimeEntity = require('../../application/helpers/time-entity');
const assessmentEnums = require('../enums/assessment');
const entityValidator = require('../../application/helpers/entity-validator');
const assetUtils = require('../../application/helpers/asset-utils');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildAssessment({ commonDataGenerator, commonDataValidator }) {
  function validateType(type) {
    const assessmentResultTypes = Object.values(assessmentEnums.types);

    commonDataValidator.validateEnumAsRequired(type, assessmentResultTypes, 'Assessment type');
  }

  function validateDatesConformity(startDate, endDate) {
    commonDataValidator.validateDateAsRequired(startDate, 'Assessment startDate');
    commonDataValidator.validateDateAsRequired(endDate, 'Assessment endDate');

    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestError('Assessment startDate parameter must not be later than endDate');
    }
  }

  function validateTitle(title) {
    commonDataValidator.validateStringAsRequired(title, 'Assessment title');
  }

  function validateDescription(description) {
    commonDataValidator.validateString(description, 'Assessment description');
  }

  function validateAssets(assets) {
    const assetsArrayMinLength = 1;
    commonDataValidator.validateArrayAsRequired(assets, assetsArrayMinLength, 'Assessement assets');

    assetUtils.validateAssets({ assets, required: true });
  }

  function validateGroup(group, required = false) {
    entityValidator.validateGroup({ group, required, errorPrefix: 'Assessment group' });
  }

  function validateTeacher(teacher, required = false) {
    entityValidator.validateTeacher({ teacher, required, errorPrefix: 'Assessment teacher' });
  }

  function validateCourse(course, required = false) {
    entityValidator.validateCourse({ course, required, errorPrefix: 'Assessment course' });
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

    constructor({ id, type, title, description, startDate, endDate, teacher, course, group, assets, createdAt, updatedAt } = {}) {
      super();

      commonDataValidator.validateIdAsRequired(id, 'Assessment id');
      validateType(type);
      validateTitle(title);
      validateDescription(description);
      validateDatesConformity(startDate, endDate);
      validateCourse(course);
      validateGroup(group);
      validateTeacher(teacher);
      validateAssets(assets);
      commonDataValidator.validateDateAsRequired(createdAt, 'Assessment createdAt');
      commonDataValidator.validateDateAsRequired(updatedAt, 'Assessment updatedAt');

      this.#id = id;
      this.#type = type;
      this.#title = title;
      this.#description = description;
      this.#startDate = startDate;
      this.#endDate = endDate;
      this.#teacher = teacher;
      this.#group = group;
      this.#course = course;
      this.#assets = assets;
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
      validateTeacher(teacher, true);
      this.#teacher = teacher;
    }

    get teacher() {
      return this.#teacher;
    }

    set course(course) {
      validateCourse(course, true);
      this.#course = course;
    }

    get course() {
      return this.#course;
    }

    set group(group) {
      validateGroup(group, true);
      this.#group = group;
    }

    get group() {
      return this.#group;
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
        type: this.#type,
        title: this.#title,
        description: this.#description,
        startDate: this.#startDate,
        endDate: this.#endDate,
        teacher: this.#teacher ? this.#teacher.toJSON() : {},
        course: this.#course ? this.#course.toJSON() : {},
        group: this.#group ? this.#group.toJSON() : {},
        asset: assetUtils.parseAssetsToJSONArray(this.#assets),
      };
    }

    static newInstance({
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
      createdAt = Date.now(),
      updatedAt = Date.now(),
    } = {}) {
      validateCourse(course, true);
      validateGroup(group, true);
      validateTeacher(teacher, true);

      return new Assessment({
        id,
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
      });
    }
  };
};
