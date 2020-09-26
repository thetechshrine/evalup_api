const assessmentResultEnums = require('../../database/enums/assessment-result');

module.exports = function buildMarkAssessmentResultsAsPublished({ databaseServices }) {
  const { assessmentResultRepository, assessmentRepository } = databaseServices;

  async function calculateObtainedCredits(assessmentResult) {
    const assessment = await assessmentRepository.findById(assessmentResult.assessment.id, { includeCourse: true });
    if (assessmentResult.obtainedNote >= assessment.course.successNote) return assessment.course.credits;

    return 0;
  }

  async function execute({ assessmentResultId, obtainedNote, comments } = {}) {
    const assessmentResult = await assessmentResultRepository.findById(assessmentResultId);
    assessmentResult.obtainedNote = obtainedNote;

    const obtainedCredits = await calculateObtainedCredits(assessmentResult);
    assessmentResult.obtainedCredits = obtainedCredits;
    assessmentResult.status = assessmentResultEnums.statuses.NOTED;
    assessmentResult.comments = comments;

    const persistedAssessmentResult = await assessmentResultRepository.update(assessmentResult, { includeStudent: true });

    return persistedAssessmentResult.toJSON();
  }

  return {
    execute,
  };
};
