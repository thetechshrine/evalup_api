const { Course } = require('../../database/entities');

module.exports = function buildCreateCourse({ databaseServices }) {
  const { courseRepository, groupRepository } = databaseServices;

  async function execute({ code, title, description, credits, successNote, groupId } = {}) {
    const group = await groupRepository.findById(groupId);
    const course = Course.newInstance({
      code,
      title,
      description,
      credits,
      successNote,
      group,
    });
    await courseRepository.ensureThereIsNoGourseRelatedToTheProvidedCode(code);

    const persistedCourse = await courseRepository.create(course);

    return persistedCourse.toJSON();
  }

  return {
    execute,
  };
};
