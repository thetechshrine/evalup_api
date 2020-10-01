const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildAssessmentController = require('../../../../controllers/assessment-controller');
const buildAssessmentResultRoutes = require('./assessment-result');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const assessmentController = buildAssessmentController(dependecies);

  router.post('/', (req, res, next) => {
    assessmentController
      .createAssessment(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.get('/', (req, res, next) => {
    assessmentController
      .getAssessments(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.put('/:assessmentId/mark-assessment-results-as-published', (req, res, next) => {
    assessmentController
      .markAssessmentResultsAsPublished(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.get('/today-assessment', (req, res, next) => {
    assessmentController
      .getTodayAssessement(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
