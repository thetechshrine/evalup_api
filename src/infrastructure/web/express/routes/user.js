const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildUserController = require('../../../../controllers/user-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const userController = buildUserController(dependecies);

  router.get('/profile', (req, res, next) => {
    userController
      .getUserProfile(HttpRequest.parseExpressRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
