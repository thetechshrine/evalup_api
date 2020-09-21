module.exports = class EmailServices {
  FRONT_APP_ACCOUNT_VALIDATION_PATH = '/account-validation';

  sendEmail() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }

  sendAccountActivationEmail() {
    return Promise.reject(new Error('ERR_METHOD_NOT_IMPLEMENTED'));
  }
};
