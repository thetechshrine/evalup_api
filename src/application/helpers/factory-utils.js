function getDefaultProperties(dataValidator) {
  return {
    id: dataValidator.generateId(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function removeImmutablePropertiesFromEntityData(entityData = {}) {
  const entityDataCopy = { ...entityData };
  delete entityDataCopy.id;
  delete entityDataCopy.createdAt;
  delete entityDataCopy.updatedAt;

  return entityDataCopy;
}

module.exports = { getDefaultProperties, removeImmutablePropertiesFromEntityData };
