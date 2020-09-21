module.exports = class TimeEntity {
  #createdAt;
  #updatedAt;

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }
};
