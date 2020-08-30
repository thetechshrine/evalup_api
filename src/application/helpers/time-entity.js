module.exports = class TimeEntity {
  #createdAt;
  #updatedAt;

  constructor() {
    this.#createdAt = Date.now();
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }
};
