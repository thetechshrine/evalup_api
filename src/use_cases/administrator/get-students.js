module.exports = function buildGetStudents({ databaseServices }) {
  const { studentRepository } = databaseServices;

  async function execute() {
    const foundStudents = await studentRepository.findAll({ includeAccount: true, includeAddress: true, includeGroup: true });

    return foundStudents.map((foundStudent) => foundStudent.toJSON());
  }

  return {
    execute,
  };
};
