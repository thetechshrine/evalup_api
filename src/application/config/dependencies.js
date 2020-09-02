const JoiCommonDataValidator = require('../../infrastructure/data_validation/joi-common-data-validator');
const CoreDataGenerator = require('../../infrastructure/data_generation/core-data-generator');
const FakerDataGenerator = require('../../infrastructure/data_generation/faker/faker-data-generator');
const CommonSecurity = require('../../infrastructure/security/common-security');

module.exports = {
  commonDataValidator: new JoiCommonDataValidator(),
  commonDataGenerator: new CoreDataGenerator(),
  fakeDataGenerator: new FakerDataGenerator(),
  security: new CommonSecurity(),
};
