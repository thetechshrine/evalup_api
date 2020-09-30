const accountEnums = require('../../database/enums/account');
const { ParameterError, UnauthorizedError } = require('./errors');

function checkIfUserRoleQueryParamWasProvidedCorrectly(request) {
  const { accountRole } = request.query;
  const accountRoles = Object.values(accountEnums.roles);
  if (!accountRoles.includes(accountRole)) throw new ParameterError('Request query accountRole is required');
}

function ensureUserIsAStudent(request) {
  if (request.user.role !== accountEnums.roles.STUDENT) {
    throw new UnauthorizedError('Only student can access this resource');
  }
}

module.exports = {
  checkIfUserRoleQueryParamWasProvidedCorrectly,
  ensureUserIsAStudent,
};
