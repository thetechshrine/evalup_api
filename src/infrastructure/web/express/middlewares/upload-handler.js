const multer = require('multer');

const storage = multer.memoryStorage();
const FILE_PARAM_NAME = 'file';

module.exports = multer({ storage }).single(FILE_PARAM_NAME);
