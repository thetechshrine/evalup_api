module.exports = function buildGetAssessmentResults({ databaseServices }) {
  const { assessmentResultRepository, assessmentRepository } = databaseServices;

  async function execute({ assessmentId } = {}) {
    await assessmentRepository.checkById(assessmentId);

    const foundAssessmentResults = await assessmentResultRepository.findAllByAssessmentId(assessmentId);

    return foundAssessmentResults.map((foundAssessmentResult) => foundAssessmentResult.toJSON());
  }

  return {
    execute,
  };
};
