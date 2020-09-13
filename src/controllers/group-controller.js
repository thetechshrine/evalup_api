const HttpResponse = require('../application/payloads/http-response');
const buildCreateGroupUseCase = require('../use_cases/administrator/create-group');

module.exports = function buildGroupController(dependencies) {
  const createGroupUseCase = buildCreateGroupUseCase(dependencies);

  async function createGroup(request) {
    const group = await createGroupUseCase.execute(request.body);

    const httpResponse = HttpResponse.created({
      message: 'Group successfully created',
      data: group,
    });

    return httpResponse;
  }

  return {
    createGroup,
  };
};
