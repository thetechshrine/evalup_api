module.exports = class CommonDataValidator {
  validateEmail(_email) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  validatePhoneNumber(_phoneNumber) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  validateDate(_date) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  validatePersonName(_personName) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
};
