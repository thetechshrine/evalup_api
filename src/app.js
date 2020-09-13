const path = require('path');
const dotenv = require('dotenv');

const dependencies = require('./application/config/dependencies');
const server = require('./infrastructure/web/express');

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
    console.log('connected to database');
  });
}

initApp();
