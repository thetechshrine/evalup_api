const { ParameterError } = require('../../../application/helpers/errors');

module.exports = function validateSendAccountActionEmailParams(recipientEmail, recipientFullName, token) {
  if (!recipientEmail) throw new ParameterError('sendAccountActivationEmail function {recipientEmail} is required');
  if (!recipientFullName) throw new ParameterError('sendAccountActivationEmail function {recipientFullName} is required');
  if (!token) throw new ParameterError('sendAccountActivationEmail function {token} is required');
};
