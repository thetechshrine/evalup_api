module.exports = class HttpRequest {
  #body;
  #params;
  #query;
  #file;
  #user;

  constructor({ body, params, query, file, user }) {
    this.#body = body;
    this.#params = params;
    this.#query = query;
    this.#file = file;
    this.#user = user;

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

  get user() {
    return this.#user;
  }

  static parseExpressRequest(expresRequest) {
    return new HttpRequest(expresRequest);
  }
};
