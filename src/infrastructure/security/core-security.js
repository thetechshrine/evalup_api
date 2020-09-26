const bcrypt = require('bcryptjs');

const { ParameterError, BadRequestError } = require('../../application/helpers/errors');
const SecurityServices = require('./interfaces/security-services');

module.exports = class CoreSecurity extends SecurityServices {
  async hashPassword(password) {
    if (!password) throw new ParameterError('Password is required');

    const ROUNDS = 10;
    return bcrypt.hash(password, ROUNDS);
  }

  async comparePassword({ persistedPassword, providedPassword } = {}) {
    const validPassword = await bcrypt.compare(providedPassword, persistedPassword);
    if (!validPassword) throw new BadRequestError('You have entered an invalid password');
  }
};
