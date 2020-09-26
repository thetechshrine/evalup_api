const HttpResponse = require('../../../../application/payloads/http-response');
const errorParser = require('../../../error_parser');
const logger = require('../../../logger');

module.exports = function erroHandler(err, _req, res, _next) {
  const httpResponse = new HttpResponse({
    status: err.status || 500,
    success: false,
    message: err.message,
  });

  logger.error(errorParser.parseError(err).toString());

  res.status(httpResponse.status).json(httpResponse.toJSON());
};
