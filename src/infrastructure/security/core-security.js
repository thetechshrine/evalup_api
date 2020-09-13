const bcrypt = require('bcryptjs');

const Security = require('./interfaces/security');

module.exports = class CoreSecurity extends Security {
  async hashPassword(password) {
    const ROUNDS = 10;
    return bcrypt.hash(password, ROUNDS);
  }

  async comparePassword({ accountPassword, password }) {
    const validPassword = bcrypt.compare(password, accountPassword);
    if (!validPassword) throw new Error('Invalid password');
  }
};
