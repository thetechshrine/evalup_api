const accountEnums = require('../../database/enums/account');
const { ParameterError } = require('./errors');

function checkIfUserRoleQueryParamWasProvidedCorrectly(request) {
  const { accountRole } = request.query;
  const accountRoles = Object.values(accountEnums.roles);
  if (!accountRoles.includes(accountRole)) throw new ParameterError('Request query accountRole is required');
}

module.exports = {
  checkIfUserRoleQueryParamWasProvidedCorrectly,
};
