const HttpResponse = require('../application/payloads/http-response');
const buildSaveFileUseCase = require('../use_cases/user/save-file');

module.exports = function buildFileStorageController(dependencies) {
  const saveFileUseCase = buildSaveFileUseCase(dependencies);

  async function saveFile(request) {
    const { folder } = request.body;
    const storageServicesResponse = await saveFileUseCase.execute({
      file: request.file,
      folder,
    });

    const httpResponse = HttpResponse.succeeded({
      message: 'File successfully uploaded',
      data: storageServicesResponse.toJSON(),
    });

    return httpResponse;
  }

  return {
    saveFile,
  };
};
