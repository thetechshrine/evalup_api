const AssessmentRespository = require('../../../../database/repositories/assessment-respository');
const { Assessment } = require('../../../../database/entities');
const { AssessmentModel } = require('../models');
const MongooseAssetRepository = require('./mongoose-asset-repository');
const MongooseTeacherRepository = require('./mongoose-teacher-repository');
const MongooseCourseRepository = require('./mongoose-course-repository');
const MongooseGroupRepository = require('./mongoose-group-repository');
const { ParameterError, ResourceNotFoundError } = require('../../../../application/helpers/errors');
const defaultSortingParams = require('../utils/default-sorting-params');

module.exports = class MongooseAssessmentRepository extends AssessmentRespository {
  static assetRepository = new MongooseAssetRepository();
  static teacherRepository = new MongooseTeacherRepository();
  static courseRepository = new MongooseCourseRepository();
  static groupRepository = new MongooseGroupRepository();

  async create(assessmentObject) {
    const assessment = new AssessmentModel({
      ...assessmentObject.toJSON(),
      teacherId: assessmentObject.teacher.id,
      courseId: assessmentObject.course.id,
      groupId: assessmentObject.group.id,
    });
    await assessment.save();

    return new Assessment(
      Object.assign(assessment, {
        assets: assessmentObject.assets,
        teacher: assessmentObject.teacher,
        course: assessmentObject.course,
        group: assessmentObject.group,
      })
    );
  }

  async checkById(id) {
    if (!id) throw new ParameterError('assessmentId parameter is mandatory');

    const matchingAssessmentsCount = await AssessmentModel.countDocuments({ id });
    if (matchingAssessmentsCount !== 1) throw new ResourceNotFoundError(`Assessment with id ${id} not found`);
  }

  async parseToAssessmentEntity(assessment, { includeTeacher = false, includeCourse = false, includeGroup = false } = {}) {
    const assets = await MongooseAssessmentRepository.assetRepository.findAllByAssessmentId(assessment.id);
    const entitiesToInclude = {};

    if (includeTeacher) {
      entitiesToInclude.teacher = MongooseAssessmentRepository.teacherRepository.findById(assessment.teacherId, {
        includeAccount: true,
      });
    }
    if (includeCourse) {
      entitiesToInclude.course = MongooseAssessmentRepository.courseRepository.findById(assessment.courseId);
    }
    if (includeGroup) {
      entitiesToInclude.group = MongooseAssessmentRepository.groupRepository.findById(assessment.groupId);
    }

    return new Assessment(Object.assign(assessment, { assets, ...entitiesToInclude }));
  }

  async findById(id, entitiesToInclude = {}) {
    await this.checkById(id);

    const foundAssessment = await AssessmentModel.findOne({ id });

    return this.parseToAssessmentEntity(foundAssessment, entitiesToInclude);
  }

  async findByForeignKey(foreignKey, entitiesToInclude) {
    const foundAssessments = await AssessmentModel.find({ [foreignKey]: foreignKey }).sort(defaultSortingParams);
    const parseToAssessmentEntityPromises = foundAssessments.map((foundAssessment) =>
      this.parseToAssessmentEntity(foundAssessment, entitiesToInclude)
    );

    return Promise.all(parseToAssessmentEntityPromises);
  }

  async findAllByGroupId(groupId) {
    return this.findByForeignKey(groupId, { includeTeacher: true, includeCourse: true });
  }

  async findAllByTeacherId(teachedId) {
    return this.findByForeignKey(teachedId, { includeGroup: true, includeCourse: true });
  }

  async delete(id) {
    await AssessmentModel.deleteOne({ id });
  }
};
