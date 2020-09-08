const { AssessmentResult, Asset } = require('../../database/entities');

module.exports = function buildCreateAssessmentResult({ databaseServices }) {
  const { assessmentResultRepository, assetRepository } = databaseServices;

  function parseAssetsArrayToInstantiatedAssetsArray(assets) {
    if (!Array.isArray(assets)) throw new Error('assets must be an array');

    return assets.map((asset) => new Asset(asset));
  }

  async function execute({ assets } = {}) {
    const assessmentResult = new AssessmentResult({
      assets: parseAssetsArrayToInstantiatedAssetsArray(assets),
    });
    const persistedAssets = await assetRepository.createAll(
      assessmentResult.assets
    );
    assessmentResult.assets = persistedAssets;
    const persistedAssessmentResult = await assessmentResultRepository.create(
      assessmentResult
    );

    return persistedAssessmentResult.toJSON();
  }

  return {
    execute,
  };
};
