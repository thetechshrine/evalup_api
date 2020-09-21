const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const logger = require('../../logger');

const buildFileStorageRoutes = require('./routes/file-storage');
const buildAccountRoutes = require('./routes/account');
const buildTeacherRoutes = require('./routes/teacher');
const buildStudentRoutes = require('./routes/student');
const buildGroupRoutes = require('./routes/group');
const buildAssessmentRoutes = require('./routes/assessment');

const loggingHandler = require('./middlewares/logging-handler');
const uploadHandler = require('./middlewares/upload-handler');
const errorHandler = require('./middlewares/error-handler');

const app = express();

function start(dependencies) {
  app.use(loggingHandler);
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(
    '/services/file-storage',
    uploadHandler,
    buildFileStorageRoutes(dependencies)
  );
  app.use('/auth', buildAccountRoutes(dependencies));
  app.use('/teachers', buildTeacherRoutes(dependencies));
  app.use('/students', buildStudentRoutes(dependencies));
  app.use('/groups', buildGroupRoutes(dependencies));
  app.use('/assessments', buildAssessmentRoutes(dependencies));
  app.use(errorHandler);

  const PORT = process.env.PORT || process.env.SERVER_PORT;
  app.listen(PORT, () => {
    logger.info(`server has started on port ${PORT}`);
  });
}

module.exports = {
  start,
};
