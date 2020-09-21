const assessmentResultEnums = require('../../database/enums/assessment-result');

module.exports = function buildMarkAssessmentResultsAsPublished({ databaseServices }) {
  const { assessmentResultRepository, assessmentRepository } = databaseServices;

  async function execute({ assessmentId } = {}) {
    await assessmentRepository.checkById(assessmentId);

    const foundAssessmentResults = assessmentResultRepository.findAllByAssessmentId(assessmentId);

    const persistedAssessmentResults = await assessmentResultRepository.updateAll(
      foundAssessmentResults.map((foundAssessmentResult) => {
        const foundAssessmentResultCopy = foundAssessmentResult;
        foundAssessmentResultCopy.status = assessmentResultEnums.statuses.PUBLISHED;

        return foundAssessmentResultCopy;
      })
    );

    return persistedAssessmentResults.map((assessmentResult) => assessmentResult.toJSON());
  }

  return {
    execute,
  };
};
