const EntityRepository = require('./entity-repository');

module.exports = class AssessmentRepository extends EntityRepository {
  checkAssessmentId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findAllByTeacherId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findAllByGroupId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
