const EntityRepository = require('./entity-repository');

module.exports = class TeacherRepository extends EntityRepository {
  findByAccountId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
