module.exports = function buildGetAssessments({ databaseServices }) {
  const { assessmentRepository, groupRepository } = databaseServices;

  async function execute({ groupId }) {
    if (groupId) await groupRepository.checkById(groupId);

    const foundAssessments = await assessmentRepository.findAllByGroupId(groupId);

    return foundAssessments.map((foundAssessment) => foundAssessment.toJSON());
  }

  return {
    execute,
  };
};
