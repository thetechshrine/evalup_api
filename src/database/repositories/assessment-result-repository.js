const EntityRepository = require('./entity-repository');

module.exports = class AssessmentResultRepository extends EntityRepository {
  checkAssessmentResultId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findAllByAssessmentId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findAllByAssessmentIdAndStudentId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
