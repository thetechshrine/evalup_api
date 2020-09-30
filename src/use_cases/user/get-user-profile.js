const accountEnums = require('../../database/enums/account');

module.exports = function buildGetUserProfile({ databaseServices }) {
  const { accountRepository, studentRepository, teacherRepository } = databaseServices;

  async function execute({ id } = {}) {
    const userProfile = {};

    const foundAccount = await accountRepository.findById(id);
    userProfile.account = foundAccount.toJSON();

    if (foundAccount.role === accountEnums.roles.TEACHER) {
      const foundTeahcer = await teacherRepository.findByAccountId(foundAccount.id);
      Object.assign(userProfile, foundTeahcer.toJSON());
    }
    if (foundAccount.role === accountEnums.roles.STUDENT) {
      const foundStudent = await studentRepository.findByAccountId(foundAccount.id);
      Object.assign(userProfile, foundStudent.toJSON());
    }

    return userProfile;
  }

  return {
    execute,
  };
};
