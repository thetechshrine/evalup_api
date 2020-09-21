const bcrypt = require('bcryptjs');

const SecurityServices = require('./interfaces/security-services');

module.exports = class CoreSecurity extends SecurityServices {
  async hashPassword(password) {
    const ROUNDS = 10;
    return bcrypt.hash(password, ROUNDS);
  }

  async comparePassword({ persistedPassword, providedPassword }) {
    const validPassword = bcrypt.compare(providedPassword, persistedPassword);
    if (!validPassword) throw new Error('Invalid password');
  }
};
