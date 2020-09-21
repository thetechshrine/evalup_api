const StackTracey = require('stacktracey');

const ErrorParser = require('../interfaces/error-parser');
const ErrorParserResult = require('../../../application/payloads/error-parser-result');

module.exports = class StackTraceyErrorParser extends ErrorParser {
  parseError(error) {
    super.parseError(error);

    const stack = new StackTracey(error);
    const firstStackItem = stack.items[0];

    return new ErrorParserResult({
      name: error.name,
      message: error.message,
      fileFullPath: firstStackItem.file,
      fileRelativePath: firstStackItem.fileRelative,
      line: firstStackItem.line,
      column: firstStackItem.column,
    });
  }
};
