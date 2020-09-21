module.exports = class FileStorageServices {
  saveFileResource() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  deleteFileResource() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
};
