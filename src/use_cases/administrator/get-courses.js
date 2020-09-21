module.exports = function buildGetCourses({ databaseServices }) {
  const { courseRepository, groupRepository } = databaseServices;

  async function execute({ groupId }) {
    await groupRepository.checkById(groupId);

    const foundCourses = await courseRepository.findAllByGroupId(groupId);

    return foundCourses.map((foundCourse) => foundCourse.toJSON());
  }

  return {
    execute,
  };
};
