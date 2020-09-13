module.exports = class FileStorageServices {
  saveFile() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  deleteFile() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
};
