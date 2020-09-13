const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildStudentController = require('../../../../controllers/student-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const studentController = buildStudentController(dependecies);

  router.post('/', (req, res, next) => {
    studentController
      .createStudent(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
