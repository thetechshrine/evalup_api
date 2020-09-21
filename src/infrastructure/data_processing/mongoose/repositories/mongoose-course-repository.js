const CourseRespository = require('../../../../database/repositories/course-repository');
const { Course } = require('../../../../database/entities');
const { CourseModel } = require('../models');
const { ResourceNotFoundError, ParameterError, BadRequestError } = require('../../../../application/helpers/errors');
const MongooseGroupRepository = require('./mongoose-group-repository');
const defaultSortingParams = require('../utils/default-sorting-params');

module.exports = class MongooseCourseRepository extends CourseRespository {
  static groupRepository = new MongooseGroupRepository();

  async create(courseObject) {
    const course = new CourseModel({
      ...courseObject.toJSON(),
      groupId: courseObject.group.id,
    });
    await course.save();

    return new Course(Object.assign(course, { group: courseObject.group }));
  }

  async checkById(id) {
    if (!id) throw new ParameterError('courseId parameter is mandatory');

    const matchingCoursesCount = await CourseModel.countDocuments({ id });
    if (matchingCoursesCount !== 1) throw new ResourceNotFoundError(`Course with id ${id} not found`);
  }

  async parseToCourseEntity(course, { includeGroup = false } = {}) {
    const entitesToInclude = {};

    if (includeGroup) {
      entitesToInclude.group = await MongooseCourseRepository.groupRepository.findById(course.groupId);
    }

    return new Course(Object.assign(course, { ...entitesToInclude }));
  }

  async findById(id, entitiesToInclude = {}) {
    await this.checkById(id);

    const foundCourse = await CourseModel.findOne({ id });

    return this.parseToCourseEntity(foundCourse, entitiesToInclude);
  }

  async findAllByGroupId(groupId) {
    const foundCourses = await CourseModel.find({ groupId }).sort(defaultSortingParams);
    const parseToCourseEntityPromises = foundCourses.map((foundCourse) => this.parseToCourseEntity(foundCourse));

    return Promise.all(parseToCourseEntityPromises);
  }

  async ensureThereIsNoGourseRelatedToTheProvidedCode(code) {
    const foundCourse = await CourseModel.findOne({ code });
    if (foundCourse) throw new BadRequestError(`Code ${code} is already associated to a course`);
  }
};
