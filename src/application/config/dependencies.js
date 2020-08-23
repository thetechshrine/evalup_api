const JoiCommonDataValidator = require('../../infrastructure/data_validation/joi-common-data-validator');
const CoreDataGenerator = require('../../infrastructure/data_generation/core-data-generator');

module.exports = {
  commonDataValidator: new JoiCommonDataValidator(),
  commonDataGenerator: new CoreDataGenerator(),
};
