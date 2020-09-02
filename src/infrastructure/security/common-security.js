const bcrypt = require('bcryptjs');

const Security = require('./interfaces/security');

module.exports = class CommonSecurity extends Security {
  async comparePassword({ accountPassword, password }) {
    const validPassword = bcrypt.compare(password, accountPassword);
    if (!validPassword) throw new Error('Invalid password');
  }
};
