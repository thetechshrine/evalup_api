module.exports = function buildCreateGroup({ databaseServices }) {
  const { groupRepository } = databaseServices;

  async function execute({ code, title, description }) {
    const group = await groupRepository.create({
      code,
      title,
      description,
    });

    return group.toJSON();
  }

  return {
    execute,
  };
};
