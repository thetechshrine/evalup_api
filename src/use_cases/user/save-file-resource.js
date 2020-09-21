const { FileResource } = require('../../database/entities');

module.exports = function buildSaveFileResource({ fileStorageServices }) {
  async function execute({ file, folder } = {}) {
    const fileResource = FileResource.newInstance({ file, folder });

    return fileStorageServices.saveFileResource(fileResource);
  }

  return {
    execute,
  };
};
