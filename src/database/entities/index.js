const dependencies = require('../../application/config/dependencies');

const Account = require('./account')(dependencies);
const PersonalInformation = require('./personal-information')(dependencies);
const Address = require('./address')(dependencies);

module.exports = { Account, PersonalInformation, Address };
