const { AssessmentResult, Asset } = require('../../database/entities');
const assetEnums = require('../../database/enums/asset');

module.exports = function buildCreateAssessmentResult({ databaseServices }) {
  const { assessmentResultRepository } = databaseServices;

  function parseAssetsArrayToInstantiatedAssetsArray(assets) {
    if (!Array.isArray(assets)) throw new Error('assets must be an array');

    return assets.map(
      (asset) =>
        new Asset({
          ...asset,
          targetResource: assetEnums.targetResources.ASSESSMENT_RESULT,
        })
    );
  }

  async function execute({ assets } = {}) {
    const assessmentResult = new AssessmentResult({
      assets: parseAssetsArrayToInstantiatedAssetsArray(assets),
    });
    const persistedAssessmentResult = await assessmentResultRepository.create(
      assessmentResult
    );

    return persistedAssessmentResult.toJSON();
  }

  return {
    execute,
  };
};
