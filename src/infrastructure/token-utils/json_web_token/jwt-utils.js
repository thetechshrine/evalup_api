const jwt = require('jsonwebtoken');

const TokenUtils = require('../interfaces/token-utils');
const { UnauthorizedError } = require('../../../application/helpers/errors');

const defaultOptions = {
  issuer: 'EvalUp',
  expiresIn: '30d',
  algorithm: 'RS512',
};

module.exports = class JwtUtils extends TokenUtils {
  generateToken(payload = {}) {
    return jwt.sign(payload, process.env.PRIVATE_KEY, defaultOptions);
  }

  verifyToken(token = '') {
    const { issuer, expiresIn, algorithm } = defaultOptions;

    try {
      jwt.verify(token, process.env.PUBLIC_KEY, { issuer, expiresIn, algorithms: [algorithm] });
    } catch (error) {
      throw new UnauthorizedError(`Token ${token} is not an authorized`);
    }
  }

  decodeToken(token = '') {
    return jwt.decode(token, { complete: true });
  }
};
