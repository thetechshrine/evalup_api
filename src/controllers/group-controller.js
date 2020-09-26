const HttpResponse = require('../application/payloads/http-response');
const buildCreateGroupUseCase = require('../use_cases/administrator/create-group');
const buildGetGroupsUseCase = require('../use_cases/administrator/get-groups');

module.exports = function buildGroupController(dependencies) {
  const createGroupUseCase = buildCreateGroupUseCase(dependencies);
  const getGroupsUseCase = buildGetGroupsUseCase(dependencies);

  async function createGroup(request) {
    const group = await createGroupUseCase.execute(request.body);

    return HttpResponse.created({
      message: 'Group successfully created',
      data: group,
    });
  }

  async function getGroups() {
    const groups = await getGroupsUseCase.execute();

    return HttpResponse.succeeded({
      data: groups,
    });
  }

  return {
    createGroup,
    getGroups,
  };
};
