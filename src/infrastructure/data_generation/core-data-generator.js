const UUID = require('uuid');

const CommonDataGenerator = require('./interfaces/common-data-generator');

module.exports = class CoreDataGenerator extends CommonDataGenerator {
  generateId() {
    return UUID.v1();
  }
};
