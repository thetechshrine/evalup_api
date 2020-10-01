const assessmentResultEnums = require('../../database/enums/assessment-result');

module.exports = function buildMarkAssessmentResultsAsPublished({ databaseServices }) {
  const { assessmentResultRepository } = databaseServices;

  async function calculateObtainedCredits(assessmentResult) {
    if (assessmentResult.obtainedNote >= assessmentResult.assessment.course.successNote) return assessmentResult.assessment.course.credits;

    return 0;
  }

  async function execute({ assessmentResultId, obtainedNote, comments } = {}) {
    const assessmentResult = await assessmentResultRepository.findById(assessmentResultId, { includeAssessment: true });
    assessmentResult.obtainedNote = obtainedNote;

    const obtainedCredits = await calculateObtainedCredits(assessmentResult);
    assessmentResult.obtainedCredits = obtainedCredits;
    assessmentResult.status = assessmentResultEnums.statuses.NOTED;
    assessmentResult.comments = comments;

    const persistedAssessmentResult = await assessmentResultRepository.update(assessmentResult, { includeStudent: true, includeAssessment: true });

    return persistedAssessmentResult.toJSON();
  }

  return {
    execute,
  };
};
