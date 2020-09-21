const storageFoldersEnum = require('../../application/enums/storage-folders');
const supportedMediaTypesEnum = require('../../application/enums/supported-media-types');

module.exports = function buildFileResourceFactory() {
  function pickARandomStorageFolder() {
    const storageFolders = Object.values(storageFoldersEnum);

    return storageFolders[Math.floor(Math.random() * storageFolders.length)];
  }

  function pickARandomSupportedMediaType() {
    const supportedMediaTypes = Object.values(supportedMediaTypesEnum);

    return supportedMediaTypes[Math.floor(Math.random() * supportedMediaTypes.length)];
  }

  return {
    generate() {
      return {
        folder: pickARandomStorageFolder(),
        file: {
          mimetype: pickARandomSupportedMediaType(),
          buffer: Buffer.from('buffer'),
        },
      };
    },
  };
};
