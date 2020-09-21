module.exports = class ErrorParser {
  parseError(error) {
    const instanceOfErrorClass = error instanceof Error;
    if (!instanceOfErrorClass) {
      throw new Error('Parameter error must be an instance of error class');
    }
  }
};
