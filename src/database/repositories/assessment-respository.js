const EntityRepository = require('./entity-repository');

module.exports = class AssessmentRepository extends EntityRepository {
  findAllByTeacherId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findAllByGroupId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findTodayAssessment() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
