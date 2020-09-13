const HttpResponse = require('../application/payloads/http-response');
// const buildCreateAccountUseCase = require('../use_cases/user/create-account');

module.exports = function buildAccountController(dependencies) {
  // const createAccountUseCase = buildCreateAccountUseCase(dependencies);

  async function createAccount(request) {
    const { email, password, role } = request;
    const account = {};

    const httpResponse = new HttpResponse({
      statusCode: 201,
      success: true,
      message: 'Account successfully created',
      data: account,
    });

    return httpResponse;
  }

  return {
    createAccount,
  };
};
