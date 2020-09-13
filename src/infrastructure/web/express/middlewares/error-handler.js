const HttpResponse = require('../../../../application/payloads/http-response');

module.exports = (err, _req, res, _next) => {
  const httpResponse = new HttpResponse({
    status: err.status || 500,
    success: false,
    message: err.message,
  });

  console.log(err);

  res.status(httpResponse.status).json(httpResponse.toJSON());
};
