module.exports = function buildGetAssessmentResults({ databaseServices }) {
  const {
    assessmentResultRepository,
    assessmentRepository,
    studentRepository,
  } = databaseServices;

  async function execute({ assessmentId, studentId } = {}) {
    await assessmentRepository.checkAssessmentId(assessmentId);
    await studentRepository.checkStudentId(studentId);

    const assessmentResults = await assessmentResultRepository.findAllByAssessmentIdAndStudentId(
      assessmentId,
      studentId
    );

    return assessmentResults.map((assessmentResult) =>
      assessmentResult.toJSON()
    );
  }

  return {
    execute,
  };
};
