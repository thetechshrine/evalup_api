const EntityRepository = require('./entity-repository');

module.exports = class AssessmentRepository extends EntityRepository {
  findAllByCourseId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findByStudentAcademicYearId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
