const faker = require('faker');

const CommonDataGenerator = require('../interfaces/common-data-generator');

module.exports = class FakerDataGenerator extends CommonDataGenerator {
  generatePersonName() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  }

  generateDate() {
    return faker.date.future().toLocaleDateString();
  }

  generateEmail() {
    return faker.internet.email();
  }

  generatePhone() {
    return faker.random.alphaNumeric(10);
  }

  generateCountryName() {
    return faker.address.country();
  }

  generateAddress() {
    return {
      streetNumber: faker.random.number(100),
      streetName: faker.address.streetName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    };
  }
};
