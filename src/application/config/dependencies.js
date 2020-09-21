const FakerDataGenerator = require('../../infrastructure/data_generation/faker/faker-data-generator');
const CoreSecurity = require('../../infrastructure/security/core-security');
const MongooseDatabaseServices = require('../../infrastructure/data_processing/mongoose/mongoose-database-services');
const CloudinaryStorageServices = require('../../infrastructure/file_storage/cloudinary/cloudinary-storage-services');
const NodeMailerServices = require('../../infrastructure/email/node_mailer/node-mailer-services');
const JwtUtils = require('../../infrastructure/token-utils/json_web_token/jwt-utils');

module.exports = {
  fakeDataGenerator: new FakerDataGenerator(),
  securityServices: new CoreSecurity(),
  databaseServices: new MongooseDatabaseServices(),
  fileStorageServices: new CloudinaryStorageServices(),
  emailServices: new NodeMailerServices(),
  tokenUtils: new JwtUtils(),
};
