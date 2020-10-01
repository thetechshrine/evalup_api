const assessmentResultEnums = require('../../database/enums/assessment-result');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildMarkAssessmentResultsAsPublished({ databaseServices }) {
  const { assessmentResultRepository, assessmentRepository } = databaseServices;

  function checkIfThereIsAResultThatHasNotBeenNoted(assessmentResults = []) {
    if (assessmentResults.find((assessmentResult) => assessmentResult.status === assessmentResultEnums.statuses.CREATED)) {
      throw new BadRequestError('You must assign note to all results before doing this action');
    }
  }

  function checkIfResultsHaveAlreadyBeenPublished(assessmentResults = []) {
    const publishedResults = assessmentResults.filter((assessmentResult) => assessmentResult.status === assessmentResultEnums.statuses.PUBLISHED);
    if (publishedResults.length === assessmentResults.length) {
      throw new BadRequestError('These results have already been published');
    }
  }

  async function execute({ assessmentId } = {}) {
    await assessmentRepository.checkById(assessmentId);

    const foundAssessmentResults = await assessmentResultRepository.findAllByAssessmentId(assessmentId);
    checkIfThereIsAResultThatHasNotBeenNoted(foundAssessmentResults);
    checkIfResultsHaveAlreadyBeenPublished(foundAssessmentResults);

    const persistedAssessmentResults = await assessmentResultRepository.updateAll(
      foundAssessmentResults.map((foundAssessmentResult) => {
        const foundAssessmentResultCopy = foundAssessmentResult;
        foundAssessmentResultCopy.status = assessmentResultEnums.statuses.PUBLISHED;

        return foundAssessmentResultCopy;
      }),
      { includeStudent: true, includeAssessment: true }
    );

    return persistedAssessmentResults.map((assessmentResult) => assessmentResult.toJSON());
  }

  return {
    execute,
  };
};
