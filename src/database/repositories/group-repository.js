const EntityRepository = require('./entity-repository');

module.exports = class GroupRepository extends EntityRepository {
  ensureThereIsNoGroupRelatedToTheProvidedCode() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
