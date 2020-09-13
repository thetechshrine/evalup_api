module.exports = class DatabaseServices {
  #databaseConnection;

  constructor() {
    this.initRepositories();
  }

  async initDatabase() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  initRepositories() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  get databaseConnection() {
    return this.#databaseConnection;
  }

  async startTransaction() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  async endTransaction() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
};
