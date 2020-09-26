const supportedMediaTypesEnum = require('../../application/enums/supported-media-types');
const storageFoldersEnum = require('../../application/enums/storage-folders');
const { ParameterError, UnsupportedMediaTypeError, BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildFileResource({ commonDataValidator }) {
  function validateFile(file) {
    if (!file) throw new ParameterError('File resource file is required');
    if (!file.mimetype) throw new BadRequestError('File resource file must includes a mimetype property');
    if (!file.buffer) throw new BadRequestError('File resource file must includes a buffer property');
    if (!Buffer.isBuffer(file.buffer)) throw new BadRequestError('File resource file buffer mus be valid');

    const supportedMediaTypes = Object.values(supportedMediaTypesEnum);
    if (!supportedMediaTypes.includes(file.mimetype)) {
      throw new UnsupportedMediaTypeError(`File resource file mimetype must be one of [${supportedMediaTypes}]`);
    }
  }

  function validateFolder(folder) {
    commonDataValidator.validateStringAsRequired(folder, 'File resource folder');

    const storageFolders = Object.values(storageFoldersEnum);
    commonDataValidator.validateEnumAsRequired(folder, storageFolders, 'File resource folder');
  }

  return class FileResource {
    #file;
    #folder;

    constructor({ file, folder } = {}) {
      validateFile(file);
      validateFolder(folder);

      this.#file = file;
      this.#folder = folder;
    }

    toJSON() {
      return {
        file: this.#file,
        folder: this.#folder,
      };
    }

    static newInstance({ file, folder } = {}) {
      return new FileResource({ file, folder });
    }
  };
};
