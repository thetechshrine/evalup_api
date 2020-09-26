const HttpResponse = require('../application/payloads/http-response');
const buildSignInUseCase = require('../use_cases/user/sign-in');
const buildValidateAccountCase = require('../use_cases/user/validate-account');
const buildCreateAdministratorUseCase = require('../use_cases/administrator/create-administraror');

module.exports = function buildAccountController(dependencies) {
  const signInUseCase = buildSignInUseCase(dependencies);
  const validateAccountUseCase = buildValidateAccountCase(dependencies);
  const createAdministratorUseCase = buildCreateAdministratorUseCase(dependencies);

  async function signIn(request) {
    const signInResponse = await signInUseCase.execute(request.body);

    return HttpResponse.created({
      message: 'You have been successfully logged in',
      data: signInResponse,
    });
  }

  async function validateAccount(request) {
    await validateAccountUseCase.execute({
      ...request.query,
      ...request.body,
    });

    return HttpResponse.succeeded({
      message: 'Your account has been successfully updated',
    });
  }

  async function createAdministrator(request) {
    const account = await createAdministratorUseCase.execute(request.body);

    return HttpResponse.created({
      message: 'Your account has been successfully created',
      data: account,
    });
  }

  return {
    signIn,
    validateAccount,
    createAdministrator,
  };
};
