module.exports = function buildGetCourses({ databaseServices }) {
  const { groupRepository } = databaseServices;

  async function execute() {
    const foundGroups = await groupRepository.findAll();

    return foundGroups.map((foundGroup) => foundGroup.toJSON());
  }

  return {
    execute,
  };
};
