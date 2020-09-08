module.exports = function buildGetAssessments({ databaseServices }) {
  const { assessmentRepository, groupRepository } = databaseServices;

  async function execute({ groupId } = {}) {
    await groupRepository.checkGroupId(groupId);

    const assessments = await assessmentRepository.findAllByGroupId(groupId);

    return assessments.map((assessment) => assessment.toJSON());
  }

  return {
    execute,
  };
};
