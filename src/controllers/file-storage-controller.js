const HttpResponse = require('../application/payloads/http-response');
const buildSaveFileUseCase = require('../use_cases/user/save-file');
const buildDeleteFileUseCase = require('../use_cases/user/delete-file');

module.exports = function buildFileStorageController(dependencies) {
  const saveFileUseCase = buildSaveFileUseCase(dependencies);
  const deleteFileUseCase = buildDeleteFileUseCase(dependencies);

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

  async function deleteFile(request) {
    await deleteFileUseCase.execute(request.params);

    const httpReponse = HttpResponse.succeeded({
      message: 'File successfully deleted',
    });

    return httpReponse;
  }

  return {
    saveFile,
    deleteFile,
  };
};
