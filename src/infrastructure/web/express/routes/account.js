const express = require('express');

const HttpRequest = require('../../../../application/payloads/http-request');
const buildAccountController = require('../../../../controllers/account-controller');

module.exports = function buildRouter(dependecies) {
  const router = express.Router();
  const accountController = buildAccountController(dependecies);

  router.post('/', (req, res, next) => {
    accountController
      .createAccount(new HttpRequest(req))
      .then((httpResponse) => {
        res.status(httpResponse.status).json(httpResponse.toJSON());
      })
      .catch((error) => {
        next(error);
      });
  });

  return router;
};
