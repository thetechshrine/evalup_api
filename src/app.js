const dependencies = require('./application/config/dependencies');
const server = require('./infrastructure/web/express');

server.start(dependencies);

dependencies.databaseServices.initDatabase().then(() => {
  console.log('connected to database');
});
