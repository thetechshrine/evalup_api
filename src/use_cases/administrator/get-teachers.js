module.exports = function buildGetStudents({ databaseServices }) {
  const { teacherRepository } = databaseServices;

  async function execute() {
    const foundTeachers = await teacherRepository.findAll({ includeAccount: true });

    return foundTeachers.map((foundTeacher) => foundTeacher.toJSON());
  }

  return {
    execute,
  };
};
