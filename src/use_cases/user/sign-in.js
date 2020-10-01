const accountEnums = require('../../database/enums/account');
const { UnauthorizedError, BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildSignIn({ databaseServices, securityServices, tokenUtils }) {
  const { accountRepository, studentRepository, teacherRepository } = databaseServices;

  async function execute({ email, password, role }) {
    const signInResponse = {};
    const tokenPayload = {};

    const foundAccount = await accountRepository.findByEmail(email);
    if (foundAccount.role !== role) throw new UnauthorizedError('You are not allowed to access this platform');

    if (!foundAccount.password) throw new BadRequestError('You need to activate your account before accessing this platform');

    await securityServices.comparePassword({
      persistedPassword: foundAccount.password,
      providedPassword: password,
    });

    signInResponse.user = foundAccount.toJSON();
    tokenPayload.id = foundAccount.id;
    tokenPayload.role = foundAccount.role;

    if (foundAccount.role === accountEnums.roles.TEACHER) {
      const foundTeahcer = await teacherRepository.findByAccountId(foundAccount.id);
      signInResponse.user = foundTeahcer.toJSON();
    }
    if (foundAccount.role === accountEnums.roles.STUDENT) {
      const foundStudent = await studentRepository.findByAccountId(foundAccount.id);
      signInResponse.user = foundStudent.toJSON();
    }

    signInResponse.token = tokenUtils.generateToken(tokenPayload);

    return signInResponse;
  }

  return {
    execute,
  };
};
