module.exports = function buildGetCourses({ databaseServices }) {
  const { groupRepository } = databaseServices;

  async function execute() {
    const groups = await groupRepository.findAll();

    return groups.map((group) => group.toJSON());
  }

  return {
    execute,
  };
};
