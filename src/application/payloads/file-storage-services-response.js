module.exports = class FileStorageServiceResponse {
  #url;
  #remoteId;

  constructor({ url, remoteId }) {
    this.#url = url;
    this.#remoteId = remoteId;
  }

  get url() {
    return this.#url;
  }

  get remoteId() {
    return this.#remoteId;
  }

  toJSON() {
    return {
      url: this.#url,
      remoteId: this.#remoteId,
    };
  }
};
