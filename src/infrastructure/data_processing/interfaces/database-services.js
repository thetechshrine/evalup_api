module.exports = class DatabaseServices {
  constructor() {
    this.initRepositories();
  }

  async initDatabase() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  initRepositories() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
};
