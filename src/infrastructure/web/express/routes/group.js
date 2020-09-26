const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildGroupController = require('../../../../controllers/group-controller');
const buildCourseRoutes = require('./course');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const groupController = buildGroupController(dependecies);

  router.post('/', (req, res, next) => {
    groupController
      .createGroup(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.get('/', (req, res, next) => {
    groupController
      .getGroups(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.use('/:groupId/courses', buildCourseRoutes(dependecies));

  return router;
};
