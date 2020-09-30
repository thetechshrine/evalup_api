const EntityRepository = require('./entity-repository');

module.exports = class AssessmentResultRepository extends EntityRepository {
  findAllByAssessmentId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findAllByAssessmentIdAndStudentId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  ensureAssessmentResultCanBeCreate() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
