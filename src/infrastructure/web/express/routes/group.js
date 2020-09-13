const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildGroupController = require('../../../../controllers/group-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const groupController = buildGroupController(dependecies);

  router.post('/', (req, res, next) => {
    groupController
      .createGroup(new HttpRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
