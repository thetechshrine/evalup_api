const dependencies = require('../../application/config/dependencies');

const Account = require('./account')(dependencies);
const PersonalInformation = require('./personal-information')(dependencies);

module.exports = { Account, PersonalInformation };
