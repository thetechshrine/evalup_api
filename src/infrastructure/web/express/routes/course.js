const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildCourseController = require('../../../../controllers/course-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const courseController = buildCourseController(dependecies);

  router.post('/', (req, res, next) => {
    courseController
      .createCourse(new HttpRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
