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

  generatePhoneNumber() {
    return '0101010101';
  }

  generateCountryName() {
    return faker.address.country();
  }

  generateAddress() {
    const DEFAULT_STREET_NUMBER = 1;
    const streetNumber = faker.random.number(100);

    return {
      streetNumber: streetNumber > 0 ? streetNumber : DEFAULT_STREET_NUMBER,
      streetName: faker.address.streetName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    };
  }

  generatePassword() {
    return faker.internet.password(8);
  }

  generateStringOfLength(length) {
    return faker.random.alphaNumeric(length);
  }

  generateId() {
    return faker.random.uuid();
  }

  generateUrl() {
    return faker.internet.url();
  }
};
