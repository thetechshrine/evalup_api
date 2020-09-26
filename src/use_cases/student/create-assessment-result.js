const { AssessmentResult, Asset } = require('../../database/entities');
const assetEnums = require('../../database/enums/asset');

module.exports = function buildCreateAssessmentResult({ databaseServices, fileStorageServices }) {
  const { assetRepository, assessmentResultRepository, assessmentRepository, studentRepository } = databaseServices;

  function parseAssetsArrayToInstantiatedAssetsArray(assets) {
    if (!Array.isArray(assets)) throw new Error('assets must be an array');

    return assets.map((asset) => {
      return Asset.newInstance({
        ...asset,
        targetResource: assetEnums.targetResources.ASSESSMENT_RESULT,
      });
    });
  }

  function assignAssessmentResultToInstanciatedAssetsArray(assets, assessmentResult) {
    if (!Array.isArray(assets)) throw new Error('assets must be an array');

    return assets.map((asset) => {
      const assetCopy = asset;
      assetCopy.assessmentResult = assessmentResult;
      return assetCopy;
    });
  }

  async function deleteRemoteAssetFiles(remoteIds) {
    const deleteRemoteAssetFilePromises = remoteIds.map((remoteId) => fileStorageServices.deleteFileResource(remoteId));
    await Promise.all(deleteRemoteAssetFilePromises);
  }

  async function deleteAllDataRelatedToTheProvidedAssessmentResult(assessmentResult) {
    await assetRepository.deleteAll(assessmentResult.assets.map((asset) => asset.id));
    await assessmentResultRepository.delete(assessmentResult.id);
    await deleteRemoteAssetFiles(assessmentResult.assets.map((asset) => asset.remoteId));
  }

  async function persistAssessmentResult(assessmentResult) {
    try {
      const persistedAssessmentResult = await assessmentResultRepository.create(assessmentResult);
      return persistedAssessmentResult;
    } catch (error) {
      await deleteAllDataRelatedToTheProvidedAssessmentResult(assessmentResult);
      throw error;
    }
  }

  async function execute({ assets, studentId, assessmentId } = {}) {
    const student = await studentRepository.findById(studentId);
    const assessment = await assessmentRepository.findById(assessmentId);
    const assessmentResult = AssessmentResult.newInstance({
      assets: parseAssetsArrayToInstantiatedAssetsArray(assets),
      student,
      assessment,
    });

    const persistedAssets = await assetRepository.createAll(
      assignAssessmentResultToInstanciatedAssetsArray(assessmentResult.assets, assessmentResult)
    );
    assessmentResult.assets = persistedAssets;

    const persistedAssessmentResult = await persistAssessmentResult(assessmentResult);

    return persistedAssessmentResult.toJSON();
  }

  return {
    execute,
  };
};
