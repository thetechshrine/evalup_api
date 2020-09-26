const { UnauthorizedError } = require('../../../../application/helpers/errors');

module.exports = function buildAuthorizationHandler({ tokenUtils }) {
  function throwUnauthorizedError() {
    throw new UnauthorizedError('You are not allowed to access this resource');
  }

  return function authorizationHandler(req, res, next) {
    const bearTokenString = req.headers.authorization;
    if (!bearTokenString) throwUnauthorizedError();

    const token = bearTokenString.split(' ')[1];
    if (!token) throwUnauthorizedError();

    tokenUtils.verifyToken(token);
    req.user = tokenUtils.decodeToken(token).payload;

    next();
  };
};
