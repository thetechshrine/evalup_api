const supportedMediaTypesEnum = require('../../application/enums/supported-media-types');
const storageFoldersEnum = require('../../application/enums/storage-folders');
const {
  UnsupportedMediaTypeError,
  ParameterError,
  BadRequestError,
} = require('../../application/helpers/errors');

module.exports = function buildSaveFile({ fileStorageServices }) {
  function validateFile(file) {
    if (!file) throw new ParameterError('Parameter file is required');
    if (!file.mimetype) {
      throw new ParameterError('File object must includes a mimetype property');
    }
    const supportedMediaTypes = Object.values(supportedMediaTypesEnum);
    if (!supportedMediaTypes.includes(file.mimetype)) {
      throw new UnsupportedMediaTypeError(
        `File type must be one of [${supportedMediaTypes}]`
      );
    }
  }

  function validateFolder(folder) {
    if (!folder) throw new ParameterError('Parameter folder is required');
    const storageFolders = Object.values(storageFoldersEnum);
    if (!storageFolders.includes(folder))
      throw new BadRequestError(
        `Parameter folder must be one of [${storageFolders}]`
      );
  }

  async function execute({ file, folder } = {}) {
    validateFile(file);
    validateFolder(folder);

    return fileStorageServices.saveFile(file, folder);
  }

  return {
    execute,
  };
};
