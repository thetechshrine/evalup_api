module.exports = function buildCreateCourse({ databaseServices }) {
  const { courseRepository, groupRepository } = databaseServices;

  async function execute({
    code,
    title,
    description,
    credits,
    successNote,
    groupId,
  }) {
    const group = await groupRepository.findById(groupId);
    if (!group) throw new Error(`Group ${groupId} not found`);

    const course = await courseRepository.create({
      code,
      title,
      description,
      credits,
      successNote,
      groupId,
    });

    return course.toJSON();
  }

  return {
    execute,
  };
};
