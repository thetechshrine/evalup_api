const EntityRepository = require('./entity-repository');

module.exports = class CourseRepository extends EntityRepository {
  checkCourseId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  findByGroudId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
