const { Course } = require('../../database/entities');

module.exports = function buildCreateCourse({ databaseServices }) {
  const { courseRepository, groupRepository } = databaseServices;

  async function execute({
    code,
    title,
    description,
    credits,
    successNote,
    groupId,
  } = {}) {
    const group = await groupRepository.checkGroupId(groupId);

    const course = new Course({
      code,
      title,
      description,
      credits,
      successNote,
      group,
    });
    const persistedCourse = await courseRepository.create(course);

    return persistedCourse.toJSON();
  }

  return {
    execute,
  };
};
