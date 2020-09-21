const { Assessment, Asset } = require('../../database/entities');
const assetEnums = require('../../database/enums/asset');

module.exports = function buildCreateAssessment({ databaseServices, fileStorageServices }) {
  const { assetRepository, assessmentRepository, groupRepository, teacherRepository, courseRepository } = databaseServices;

  function parseAssetsArrayToInstantiatedAssetsArray(assets) {
    if (!Array.isArray(assets)) throw new Error('assets must be an array');

    return assets.map((asset) =>
      Asset.newInstance({
        ...asset,
        targetResource: assetEnums.targetResources.ASSESSMENT,
      })
    );
  }

  function assignAssessmentToInstanciatedAssetsArray(assets, assessment) {
    if (!Array.isArray(assets)) throw new Error('assets must be an array');

    return assets.map((asset) => {
      const assetCopy = asset;
      assetCopy.assessment = assessment;
      return assetCopy;
    });
  }

  async function deleteRemoteAssetFiles(remoteIds) {
    const deleteRemoteAssetFilePromises = remoteIds.map((remoteId) => fileStorageServices.delete(remoteId));
    await Promise.all(deleteRemoteAssetFilePromises);
  }

  async function deleteAllDataRelatedToTheProvidedAssessment(assessment) {
    await assetRepository.deleteAll(assessment.assets.map((asset) => asset.id));
    await assessmentRepository.delete(assessment.id);
    await deleteRemoteAssetFiles(assessment.assets.map((asset) => asset.remoteId));
  }

  async function persistAssessment(assessment) {
    try {
      const persistedAssessment = await assessmentRepository.create(assessment);
      return persistedAssessment;
    } catch (error) {
      await deleteAllDataRelatedToTheProvidedAssessment(assessment);
      throw error;
    }
  }

  async function execute({ title, type, description, startDate, endDate, assets, groupId, courseId, teacherId } = {}) {
    const group = await groupRepository.findById(groupId);
    const course = await courseRepository.findById(courseId);
    const teacher = await teacherRepository.findById(teacherId);
    const assessment = Assessment.newInstance({
      title,
      type,
      description,
      startDate,
      endDate,
      assets: parseAssetsArrayToInstantiatedAssetsArray(assets),
      group,
      teacher,
      course,
    });
    const persistedAssets = await assetRepository.createAll(assignAssessmentToInstanciatedAssetsArray(assessment.assets, assessment));
    assessment.assets = persistedAssets;

    const persistedAssessment = await persistAssessment(assessment);

    return persistedAssessment.toJSON();
  }

  return {
    execute,
  };
};
