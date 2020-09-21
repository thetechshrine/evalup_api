const EntityRepository = require('./entity-repository');

module.exports = class AssetRepository extends EntityRepository {
  findAllByAssessmentId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findAllByAssessmentResultId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
