const AssessmentRespository = require('../../../../database/repositories/assessment-respository');
const { Assessment } = require('../../../../database/entities');
const { AssessmentModel } = require('../models');
const MongooseAssetRepository = require('./mongoose-asset-repository');

module.exports = class MongooseAssessmentRepository extends AssessmentRespository {
  constructor() {
    this.mongooseAssetRepository = new MongooseAssetRepository();
  }

  assignAssessmentToAssetsArray(assets, assessmentObject) {
    if (!Array.isArray(assets)) throw new Error('assets must be an array');

    return assets.map((asset) => {
      const assetToAssign = asset;
      assetToAssign.assessment = assessmentObject;

      return assetToAssign;
    });
  }

  async create(assessmentObject) {
    const persistedAssets = await this.mongooseAssetRepository.createAll(
      this.assignAssessmentToAssetsArray(
        assessmentObject.assets,
        assessmentObject
      )
    );
    const assessment = new AssessmentModel({
      id: assessmentObject.id,
      title: assessmentObject.id,
      type: assessmentObject.type,
      description: assessmentObject.description,
      startDate: assessmentObject.startDate,
      endDate: assessmentObject.endDate,
      teacherId: assessmentObject.teacher.id,
      courseId: assessmentObject.course.id,
      groupId: assessmentObject.group.id,
    });
    await assessment.save();

    return new Assessment({ ...assessment, assets: persistedAssets });
  }

  async findById(assessmentId) {
    const assessment = AssessmentModel.findOne({ id: assessmentId });
    const asse
  }

  async findAllByGroupId(groupId) {
    return AssessmentModel.find({  })
  }

  async findAllByTeacherId(teachedId) {}

  async checkAssessmentId(assessmentId) {}
};
