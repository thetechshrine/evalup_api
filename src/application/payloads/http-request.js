module.exports = class HttpRequest {
  #body;
  #params;
  #query;

  constructor({ body, params, query }) {
    this.#body = body;
    this.#params = params;
    this.#query = query;

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

  static parseExpressRequest(expresRequest) {
    return new HttpRequest(expresRequest);
  }
};
