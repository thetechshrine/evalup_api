module.exports = function buildGetAssessments({ databaseServices }) {
  const { assessmentRepository, teacherRepository } = databaseServices;

  async function execute({ teacherId } = {}) {
    await teacherRepository.checkTeacherId(teacherId);

    const assessments = await assessmentRepository.findAllByTeacherId(
      teacherId
    );

    return assessments.map((assessment) => assessment.toJSON());
  }

  return {
    execute,
  };
};
