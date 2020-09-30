const HttpResponse = require('../application/payloads/http-response');
const buildGetUserProfileUseCase = require('../use_cases/user/get-user-profile');

module.exports = function buildAccountController(dependencies) {
  const getUserProfileUseCase = buildGetUserProfileUseCase(dependencies);

  async function getUserProfile(request) {
    const userProfile = await getUserProfileUseCase.execute(request.user);

    return HttpResponse.created({
      data: userProfile,
    });
  }

  return {
    getUserProfile,
  };
};
