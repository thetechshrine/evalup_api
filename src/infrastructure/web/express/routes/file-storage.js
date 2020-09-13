const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildFileStorageController = require('../../../../controllers/file-storage-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const fileStorageController = buildFileStorageController(dependecies);

  router.post('/upload', (req, res, next) => {
    fileStorageController
      .saveFile(new HttpRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
