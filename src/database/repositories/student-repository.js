const EntityRepository = require('./entity-repository');

module.exports = class StudentRepository extends EntityRepository {
  findByAccountId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  ensureThereIsNoAccountRelatedToTheProvidedPhone() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
