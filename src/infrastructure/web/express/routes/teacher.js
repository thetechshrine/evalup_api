const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildTeacherController = require('../../../../controllers/teacher-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const teacherController = buildTeacherController(dependecies);

  router.post('/', (req, res, next) => {
    teacherController
      .createTeacher(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
