const AssessmentResultRepository = require('../../../../database/repositories/assessment-result-repository');
const { AssessmentResult } = require('../../../../database/entities');
const { AssessmentResultModel } = require('../models');
const MongooseAssetRepository = require('./mongoose-asset-repository');
const MongooseStudentRepository = require('./mongoose-student-repository');
const MongooseAssessmentRepository = require('./mongoose-assessment-repository');
const { ParameterError, ResourceNotFoundError } = require('../../../../application/helpers/errors');
const defaultSortingParams = require('../utils/default-sorting-params');

module.exports = class MongooseAssessmentResultRepository extends AssessmentResultRepository {
  static assetRepository = new MongooseAssetRepository();
  static studentRepository = new MongooseStudentRepository();
  static assessmentRepository = new MongooseAssessmentRepository();

  async create(assessmentResultObject) {
    const assessmentResult = new AssessmentResultModel({
      ...assessmentResultObject.toJSON(),
      studentId: assessmentResultObject.student.id,
      assessmentId: assessmentResultObject.assessment.id,
    });
    await assessmentResult.save();

    return new AssessmentResult(
      Object.assign(assessmentResult, {
        assets: assessmentResultObject.assets,
        student: assessmentResultObject.student,
        assessment: assessmentResultObject.assessment,
      })
    );
  }

  async checkById(id) {
    if (!id) throw new ParameterError('assessmentResultId parameter is mandatory');

    const matchingAssessmentResultsCount = await AssessmentResultModel.countDocuments({ id });
    if (matchingAssessmentResultsCount !== 1) throw new ResourceNotFoundError(`Assessment result with id ${id} not found`);
  }

  async parseToAssessmentResultEntity(assessmentResult, { includeAssessment = false, includeStudent = false } = {}) {
    const assets = await MongooseAssessmentResultRepository.assetRepository.findAllByAssessmentResultId(assessmentResult.id);
    const entitiesToInclude = {};

    if (includeAssessment) {
      entitiesToInclude.assessment = await MongooseAssessmentResultRepository.assessmentRepository.findById(assessmentResult.assessmentId);
    }
    if (includeStudent) {
      entitiesToInclude.student = await MongooseAssessmentResultRepository.studentRepository.findById(assessmentResult.studentId, {
        includeAccount: true,
        includeAddress: true,
      });
    }

    return new AssessmentResult(Object.assign(assessmentResult, { assets, ...entitiesToInclude }));
  }

  async findById(id, entitiesToInclude = {}) {
    await this.checkById(id);

    const foundAssessmentResult = await AssessmentResultModel.findOne({ id });

    return this.parseToAssessmentResultEntity(foundAssessmentResult, entitiesToInclude);
  }

  async findAllByAssessmentId(assessmentId) {
    const foundAssessmentResults = await AssessmentResultModel.find({ assessmentId }).sort(defaultSortingParams);
    const parseToAssessmentResultEntityPromises = foundAssessmentResults.map((foundAssessmentResult) =>
      this.parseToAssessmentResultEntity(foundAssessmentResult, { includeStudent: true })
    );

    return Promise.all(parseToAssessmentResultEntityPromises);
  }

  async findAllByAssessmentIdAndStudentId(assessmentId, studentId) {
    const foundAssessmentResults = await AssessmentResultModel.find({ assessmentId, studentId }).sort(defaultSortingParams);
    const parseToAssessmentResultEntityPromises = foundAssessmentResults.map((foundAssessmentResult) =>
      this.parseToAssessmentResultEntity(foundAssessmentResult)
    );

    return Promise.all(parseToAssessmentResultEntityPromises);
  }

  async update(assessmentResultObject) {
    const assessmentResult = await AssessmentResultModel.findOne({ id: assessmentResultObject.id });
    Object.assign(assessmentResult, assessmentResultObject.toJSON());
    await assessmentResult.save();

    return this.parseToAssessmentResultEntity(assessmentResult);
  }

  async updateAll(assessmentResultObjectArray = []) {
    const updatePromises = assessmentResultObjectArray.map((assessmentResultObject) => this.update(assessmentResultObject));

    return Promise.all(updatePromises);
  }

  async delete(id) {
    await AssessmentResultModel.deleteOne({ id });
  }
};
