const assessmentResultEnums = require('../../database/enums/assessment-result');

module.exports = function buildMarkAssessmentResultsAsPublished({
  databaseServices,
}) {
  const { assessmentResultRepository, assessmentRepository } = databaseServices;

  async function execute({ assessmentId } = {}) {
    await assessmentRepository.checkAssessmentId(assessmentId);

    const assessmentResults = assessmentResultRepository.findAllByAssessmentId(
      assessmentId
    );

    const persistedAssessmentResults = await assessmentResultRepository.updateAll(
      assessmentResults.map((assessmentResult) => {
        const assessmentResultToUpdate = assessmentResult;
        assessmentResultToUpdate.status =
          assessmentResultEnums.statuses.PUBLISHED;

        return assessmentResultToUpdate;
      })
    );

    return persistedAssessmentResults.map((assessmentResult) =>
      assessmentResult.toJSON()
    );
  }

  return {
    execute,
  };
};
