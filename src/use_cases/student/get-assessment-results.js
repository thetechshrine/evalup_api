module.exports = function buildGetAssessmentResults({ databaseServices }) {
  const { assessmentResultRepository, assessmentRepository, studentRepository } = databaseServices;

  async function execute({ assessmentId, studentId } = {}) {
    await assessmentRepository.checkById(assessmentId);
    await studentRepository.checkById(studentId);

    const foundAssessmentResults = await assessmentResultRepository.findAllByAssessmentIdAndStudentId(assessmentId, studentId);

    return foundAssessmentResults.map((foundAssessmentResult) => foundAssessmentResult.toJSON());
  }

  return {
    execute,
  };
};
