module.exports = function buildGetCourses({ databaseServices }) {
  const { courseRepository, groupRepository } = databaseServices;

  async function execute({ groupId }) {
    await groupRepository.checkGroupId(groupId);

    const courses = await courseRepository.findByGroudId(groupId);

    return courses.map((course) => course.toJSON());
  }

  return {
    execute,
  };
};
