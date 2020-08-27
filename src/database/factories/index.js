const FakerDataGenerator = require('../../infrastructure/data_generation/faker/faker-data-generator');
const buildAccountFactory = require('./account-factory');
const buildPersonalInformationFactory = require('./personal-information-factory');
const buildAddressFactory = require('./address-factory');

const fakerDataGenerator = new FakerDataGenerator();

module.exports = {
  AccountFactory: buildAccountFactory({
    fakeDataGenerator: fakerDataGenerator,
  }),
  PersonalInformationFactory: buildPersonalInformationFactory({
    fakeDataGenerator: fakerDataGenerator,
  }),
  AddressFactory: buildAddressFactory({
    fakeDataGenerator: fakerDataGenerator,
  }),
};
