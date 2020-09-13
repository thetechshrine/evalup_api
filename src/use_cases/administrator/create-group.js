const { Group } = require('../../database/entities');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildCreateGroup({ databaseServices }) {
  const { groupRepository } = databaseServices;

  async function checkExitingGroupByCode(code) {
    const group = await groupRepository.findByCode(code);
    if (group) throw new BadRequestError(`Group code ${code} already exists`);
  }

  async function persistGroup(group) {
    try {
      const persistedGroup = await groupRepository.create(group);
      return persistedGroup;
    } catch (error) {
      await groupRepository.delete(group.id);
      throw error;
    }
  }

  async function execute({ code, title, description } = {}) {
    const group = new Group({ code, title, description });
    await checkExitingGroupByCode(code);
    const persistedGroup = await persistGroup(group);

    return persistedGroup.toJSON();
  }

  return {
    execute,
  };
};
