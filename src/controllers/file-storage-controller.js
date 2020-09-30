const HttpResponse = require('../application/payloads/http-response');
const buildSaveFileResourceUseCase = require('../use_cases/user/save-file-resource');
const buildDeleteFileUseResourceCase = require('../use_cases/user/delete-file-resource');

module.exports = function buildFileStorageController(dependencies) {
  const saveFileResourceUseCase = buildSaveFileResourceUseCase(dependencies);
  const deleteFileResourceUseCase = buildDeleteFileUseResourceCase(dependencies);

  async function saveFileResource(request) {
    const { folder } = request.body;
    const storageServicesResponse = await saveFileResourceUseCase.execute({
      file: request.file,
      folder,
    });

    return HttpResponse.succeeded({
      message: 'File successfully uploaded',
      data: storageServicesResponse.toJSON(),
    });
  }

  async function deleteFileResource(request) {
    await deleteFileResourceUseCase.execute(request.query);

    return HttpResponse.succeeded({
      message: 'File successfully deleted',
    });
  }

  return {
    saveFileResource,
    deleteFileResource,
  };
};
