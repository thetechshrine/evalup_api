const { Group } = require('../../database/entities');

module.exports = function buildCreateGroup({ databaseServices }) {
  const { groupRepository } = databaseServices;

  async function execute({ code, title, description } = {}) {
    const group = new Group({ code, title, description });
    const persistedGroup = await groupRepository.create(group);

    return persistedGroup.toJSON();
  }

  return {
    execute,
  };
};
