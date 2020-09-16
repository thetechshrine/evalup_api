const path = require('path');
const dotenv = require('dotenv');

const dependencies = require('./application/config/dependencies');
const server = require('./infrastructure/web/express');
const logger = require('./infrastructure/logger');

function initEnvironmentVariables() {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
      path: path.join(__dirname, '/application', '/env', 'default.env'),
    });
  }
}

function initApp() {
  initEnvironmentVariables();

  server.start(dependencies);

  dependencies.databaseServices.initDatabase().then(() => {
    logger.info('connected to database');
  });
}

initApp();
