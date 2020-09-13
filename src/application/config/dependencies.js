const FakerDataGenerator = require('../../infrastructure/data_generation/faker/faker-data-generator');
const CoreSecurity = require('../../infrastructure/security/core-security');
const MongooseDatabaseServices = require('../../infrastructure/data_processing/mongoose/mongoose-database-services');
const CloudinaryStorageServices = require('../../infrastructure/file_storage/cloudinary/cloudinary-storage-services');

module.exports = {
  fakeDataGenerator: new FakerDataGenerator(),
  securityServices: new CoreSecurity(),
  databaseServices: new MongooseDatabaseServices(),
  fileStorageServices: new CloudinaryStorageServices(),
};
