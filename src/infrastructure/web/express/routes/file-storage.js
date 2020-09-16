const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildFileStorageController = require('../../../../controllers/file-storage-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const fileStorageController = buildFileStorageController(dependecies);

  router.post('/', (req, res, next) => {
    fileStorageController
      .saveFile(new HttpRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.delete('/:remoteId', (req, res, next) => {
    fileStorageController
      .deleteFile(new HttpRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
