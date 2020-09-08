module.exports = function buildGetAssessment({ databaseServices }) {
  const { assessmentResultRepository } = databaseServices;

  async function execute({ assessmentResultId } = {}) {
    const assessmentResult = assessmentResultRepository.checkAssessmentResultId(
      assessmentResultId
    );

    return assessmentResult.toJSON();
  }

  return {
    execute,
  };
};
