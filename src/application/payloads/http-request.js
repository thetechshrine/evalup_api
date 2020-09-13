module.exports = class HttpRequest {
  #body;
  #params;
  #query;
  #file;

  constructor({ body, params, query, file }) {
    this.#body = body;
    this.#params = params;
    this.#query = query;
    this.#file = file;

    Object.freeze(this);
  }

  get body() {
    return this.#body;
  }

  get params() {
    return this.#params;
  }

  get query() {
    return this.#query;
  }

  get file() {
    return this.#file;
  }

  static parseExpressRequest(expresRequest) {
    return new HttpRequest(expresRequest);
  }
};
