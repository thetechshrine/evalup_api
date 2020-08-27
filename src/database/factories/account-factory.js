const accountEnums = require('../enums/account');

module.exports = function buildAccountFactory({ fakeDataGenerator }) {
  return {
    pickARandomAccountRole() {
      const accountRoles = Object.values(accountEnums.roles);
      return accountRoles[Math.floor(Math.random() * accountRoles.length)];
    },

    generate(initialValues = {}) {
      return {
        email: fakeDataGenerator.generateEmail(),
        password: fakeDataGenerator.generatePassword(),
        role: this.pickARandomAccountRole(),
        ...initialValues,
      };
    },
  };
};
