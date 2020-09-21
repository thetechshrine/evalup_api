const { Group } = require('../../database/entities');

module.exports = function buildCreateGroup({ databaseServices }) {
  const { groupRepository } = databaseServices;

  async function execute({ code, title, description } = {}) {
    const group = Group.newInstance({ code, title, description });
    await groupRepository.ensureThereIsNoGroupRelatedToTheProvidedCode(code);

    const persistedGroup = await groupRepository.create(group);

    return persistedGroup.toJSON();
  }

  return {
    execute,
  };
};
