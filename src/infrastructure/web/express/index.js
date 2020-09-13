const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const buildAccountRoutes = require('./routes/account');
const buildTeacherRoutes = require('./routes/teacher');
const buildStudentRoutes = require('./routes/student');
const buildGroupRoutes = require('./routes/group');

const errorHandler = require('./middlewares/error-handler');

const app = express();

function start(dependencies) {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/accounts', buildAccountRoutes(dependencies));
  app.use('/teachers', buildTeacherRoutes(dependencies));
  app.use('/students', buildStudentRoutes(dependencies));
  app.use('/groups', buildGroupRoutes(dependencies));
  app.use(errorHandler);

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
}

module.exports = {
  start,
};
