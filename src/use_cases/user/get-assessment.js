module.exports = function buildGetAssessment({ databaseServices }) {
  const { assessmentRepository } = databaseServices;

  async function execute({ assessmentId } = {}) {
    const assessment = assessmentRepository.checkAssessmentId(assessmentId);

    return assessment.toJSON();
  }

  return {
    execute,
  };
};
