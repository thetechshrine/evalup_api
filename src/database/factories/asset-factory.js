const assetEnums = require('../enums/asset');

module.exports = function buildAssetFactory({ fakeDataGenerator }) {
  function pickARamdomAssetType() {
    const assetTypes = Object.values(assetEnums.types);
    return assetTypes[Math.floor(Math.random() * assetTypes.length)];
  }

  function pickARamdomAssetRole() {
    const assetRoles = Object.values(assetEnums.roles);
    return assetRoles[Math.floor(Math.random() * assetRoles.length)];
  }

  function pickARamdomTargetResource() {
    const targetResources = Object.values(assetEnums.targetResources);
    return targetResources[Math.floor(Math.random() * targetResources.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        type: pickARamdomAssetType(),
        role: pickARamdomAssetRole(),
        targetResource: pickARamdomTargetResource(),
        url: fakeDataGenerator.generateUrl(),
        ...initialValues,
      };
    },
  };
};
