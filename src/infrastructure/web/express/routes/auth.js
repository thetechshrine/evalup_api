const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildAuthController = require('../../../../controllers/auth-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const authController = buildAuthController(dependecies);

  router.put('/validate-account', (req, res, next) => {
    authController
      .validateAccount(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.post('/sign-in', (req, res, next) => {
    authController
      .signIn(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  router.post('/create-administrator', (req, res, next) => {
    authController
      .createAdministrator(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
