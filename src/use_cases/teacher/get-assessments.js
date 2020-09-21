module.exports = function buildGetAssessments({ databaseServices }) {
  const { assessmentRepository, teacherRepository } = databaseServices;

  async function execute({ teacherId } = {}) {
    await teacherRepository.checkById(teacherId);

    const foundAssessments = await assessmentRepository.findAllByTeacherId(teacherId);

    return foundAssessments.map((foundAssessment) => foundAssessment.toJSON());
  }

  return {
    execute,
  };
};
