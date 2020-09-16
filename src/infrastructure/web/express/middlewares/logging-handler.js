const morgan = require('morgan');

const logger = require('../../../logger');

module.exports = morgan('combined', {
  stream: {
    write: (message) => {
      logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
  },
});
