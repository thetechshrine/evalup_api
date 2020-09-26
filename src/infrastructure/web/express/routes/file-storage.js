const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildFileStorageController = require('../../../../controllers/file-storage-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const fileStorageController = buildFileStorageController(dependecies);

  router.post('/', (req, res, next) => {
    fileStorageController
      .saveFileResource(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.delete('/:remoteId', (req, res, next) => {
    fileStorageController
      .deleteFileResource(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
