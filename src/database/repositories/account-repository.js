const EntityRepository = require('./entity-repository');

module.exports = class AccountRepository extends EntityRepository {
  findByEmail() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
