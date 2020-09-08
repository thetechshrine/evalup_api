module.exports = function buildGetAssessmentResults({ databaseServices }) {
  const { assessmentResultRepository, assessmentRepository } = databaseServices;

  async function execute({ assessmentId } = {}) {
    await assessmentRepository.checkAssessmentId(assessmentId);

    const assessmentResults = await assessmentResultRepository.findByAssessmentId(
      assessmentId
    );

    return assessmentResults.map((assessmentResult) =>
      assessmentResult.toJSON()
    );
  }

  return {
    execute,
  };
};
