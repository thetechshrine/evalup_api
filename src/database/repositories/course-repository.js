const EntityRepository = require('./entity-repository');

module.exports = class CourseRepository extends EntityRepository {
  findAllByGroupId() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  ensureThereIsNoGourseRelatedToTheProvidedCode() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
