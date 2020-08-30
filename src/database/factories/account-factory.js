const accountEnums = require('../enums/account');

module.exports = function buildAccountFactory({ fakeDataGenerator }) {
  function pickARandomAccountRole() {
    const accountRoles = Object.values(accountEnums.roles);
    return accountRoles[Math.floor(Math.random() * accountRoles.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        email: fakeDataGenerator.generateEmail(),
        password: fakeDataGenerator.generatePassword(),
        role: pickARandomAccountRole(),
        ...initialValues,
      };
    },
  };
};
