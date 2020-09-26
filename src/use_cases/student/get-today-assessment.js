module.exports = function buildGetAssessments({ databaseServices }) {
  const { assessmentRepository, groupRepository } = databaseServices;

  async function execute({ groupId } = {}) {
    await groupRepository.checkById(groupId);

    const foundAssessment = await assessmentRepository.findTodayAssessment(groupId);

    return foundAssessment.toJSON();
  }

  return {
    execute,
  };
};
