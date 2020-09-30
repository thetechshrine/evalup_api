const AssetRespository = require('../../../../database/repositories/asset-repository');
const { Asset } = require('../../../../database/entities');
const assetEnums = require('../../../../database/enums/asset');
const { AssetModel } = require('../models');
const defaultSortingParams = require('../utils/default-sorting-params');

module.exports = class MongooseAssetRepository extends AssetRespository {
  assignForeignKeysToAsset(asset, assetObject) {
    if (assetObject.targetResource === assetEnums.targetResources.ASSESSMENT) {
      Object.assign(asset, { assessmentId: assetObject.assessment.id });
    } else if (assetObject.targetResource === assetEnums.targetResources.ASSESSMENT_RESULT) {
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
    const createAssetPromises = assetObjectsArray.map((assetObject) => this.create(assetObject));

    return Promise.all(createAssetPromises);
  }

  async findAllByAssessmentId(assessmentId) {
    const assets = await AssetModel.find({ assessmentId }).sort(defaultSortingParams);

    return assets.map((asset) => new Asset(asset));
  }

  async findAllByAssessmentResultId(assessmentResultId) {
    const assets = await AssetModel.find({ assessmentResultId }).sort(defaultSortingParams);

    return assets.map((asset) => new Asset(asset));
  }

  async delete(assetId) {
    await AssetModel.deleteOne({ id: assetId });
  }

  async deleteAll(assetIdsArray) {
    if (!Array.isArray(assetIdsArray)) return [];

    const deleteAssetPromises = assetIdsArray.map((assetId) => this.delete(assetId));

    return Promise.all(deleteAssetPromises);
  }
};
