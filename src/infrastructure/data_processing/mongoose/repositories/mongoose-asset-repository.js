const AssetRespository = require('../../../../database/repositories/asset-repository');
const { Asset } = require('../../../../database/entities');
const assetEnums = require('../../../../database/enums/asset');
const { AssetModel } = require('../models');

module.exports = class MongooseAssetRepository extends AssetRespository {
  assignForeignKeysToAsset(asset, assetObject) {
    if (assetObject.targetResource === assetEnums.targetResources.ASSESSMENT) {
      Object.assign(asset, { assessmentId: assetObject.assessment.id });
    } else if (
      assetObject.targetResource ===
      assetEnums.targetResources.ASSESSMENT_RESULT
    ) {
      Object.assign(asset, {
        assessmentResultId: assetObject.assessmentResult.id,
      });
    }
  }

  async create(assetObject) {
    const asset = new AssetModel(assetObject.toJSON());
    this.assignForeignKeysToAsset(asset, assetObject);
    await asset.save();

    return new Asset(asset);
  }

  async createAll(assetObjectsArray) {
    if (!Array.isArray(assetObjectsArray)) return [];
    const createAssetPromises = assetObjectsArray.map((assetObject) =>
      this.create(assetObject)
    );

    return Promise.all(createAssetPromises);
  }
};
