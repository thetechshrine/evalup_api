const { getDefaultProperties } = require('../../application/helpers/factory-utils');
const accountEnums = require('../enums/account');

module.exports = function buildAccountFactory({ fakeDataGenerator }) {
  function pickARandomAccountRole() {
    const accountRoles = Object.values(accountEnums.roles);
    return accountRoles[Math.floor(Math.random() * accountRoles.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        ...getDefaultProperties(fakeDataGenerator),
        active: true,
        email: fakeDataGenerator.generateEmail(),
        password: fakeDataGenerator.generatePassword(),
        role: pickARandomAccountRole(),
        ...initialValues,
      };
    },
  };
};
