const FakerDataGenerator = require('../../infrastructure/data_generation/faker/faker-data-generator');
const buildPersonalInformationFactory = require('./personal-information-factory');

const fakerDataGenerator = new FakerDataGenerator();

module.exports = {
  PersonalInformationFactory: buildPersonalInformationFactory({
    fakeDataGenerator: fakerDataGenerator,
  }),
};
