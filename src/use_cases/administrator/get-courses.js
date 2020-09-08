module.exports = function buildGetCourses({ databaseServices }) {
  const { courseRepository, groupRepository } = databaseServices;

  async function execute({ groupId }) {
    await groupRepository.checkGroupId(groupId);

    const courses = await courseRepository.findAllByGroudId(groupId);

    return courses.map((course) => course.toJSON());
  }

  return {
    execute,
  };
};
