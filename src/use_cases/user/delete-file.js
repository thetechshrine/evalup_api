const { ParameterError } = require('../../application/helpers/errors');

module.exports = function buildDeleteFile({ fileStorageServices }) {
  function validateRemoteId(remoteId) {
    if (!remoteId) throw new ParameterError('Parameter remoteId is required');
  }

  async function execute({ remoteId } = {}) {
    validateRemoteId(remoteId);

    return fileStorageServices.deleteFile(remoteId);
  }

  return {
    execute,
  };
};
