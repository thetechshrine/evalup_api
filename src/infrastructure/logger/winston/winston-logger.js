const { createLogger, format, transports } = require('winston');

const Logger = require('../interfaces/logger');

module.exports = class WinstonLogger extends Logger {
  static logger = createLogger({
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      ),
      format.colorize()
    ),
    transports: [
      new transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
      }),
    ],
  });

  info(message) {
    WinstonLogger.logger.info(message);
  }

  error(message) {
    WinstonLogger.logger.error(message);
  }

  warning(message) {
    WinstonLogger.logger.warn(message);
  }
};
