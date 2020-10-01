module.exports = function buildGetAssessmentResults({ databaseServices }) {
  const { assessmentResultRepository, studentRepository } = databaseServices;

  async function execute({ studentId } = {}) {
    await studentRepository.checkById(studentId);

    const foundAssessmentResults = await assessmentResultRepository.findAllByStudentId(studentId);

    return foundAssessmentResults.map((foundAssessmentResult) => foundAssessmentResult.toJSON());
  }

  return {
    execute,
  };
};
