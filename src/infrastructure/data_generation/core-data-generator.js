const UUID = require('uuid');

const CommonDataGenerator = require('./interfaces/common-data-generator');

module.exports = class CommonDataGeneratorImplementation extends CommonDataGenerator {
  generateId() {
    return UUID.v1();
  }
};
