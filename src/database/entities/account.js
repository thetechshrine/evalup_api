const accountEnums = require('../enums/account');

module.exports = function buildAccount({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validatePassword(password) {
    if (!password || password.length < 4) {
      throw new Error('Password must include at least 4 characters');
    }
  }

  function validateRole(role) {
    const accountRoles = Object.values(accountEnums.roles);
    if (!role || !accountRoles.includes(role)) {
      throw new Error(`Role must be one of [${accountRoles}]`);
    }
  }

  return class Account {
    constructor({ email, password, role } = {}) {
      commonDataValidator.validateEmail(email);
      validatePassword(password);
      validateRole(role);

      this.id = commonDataGenerator.generateId();
      this.email = email;
      this.password = password;
      this.role = role;
    }
  };
};
