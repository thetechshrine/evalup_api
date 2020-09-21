const accountEnums = require('../../database/enums/account');

module.exports = function buildSignIn({ databaseServices, securityServices, tokenUtils }) {
  const { accountRespository, studentRepository, teacherRepository } = databaseServices;

  async function execute({ email, password }) {
    const signInResponse = {};
    const tokenPayload = {};

    const foundAccount = await accountRespository.findByEmail(email);

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
      tokenPayload.id = foundTeahcer.id;
    }
    if (foundAccount.role === accountEnums.roles.STUDENT) {
      const foundStudent = await studentRepository.findByAccountId(foundAccount.id);
      signInResponse.user = foundStudent.toJSON();
      tokenPayload.id = foundStudent.id;
    }

    signInResponse.token = tokenUtils.generateToken(tokenPayload);

    return signInResponse;
  }

  return {
    execute,
  };
};
