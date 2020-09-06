const TimeEntity = require('../../application/helpers/time-entity');
const assetEnums = require('../enums/asset');

module.exports = function buildAsset({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateType(type) {
    const assetTypes = Object.values(assetEnums.types);
    if (!type || !assetTypes.includes(type)) {
      throw new Error(`type parameter must be one of ${assetTypes}`);
    }
  }

  function validateRole(role) {
    const assetRoles = Object.values(assetEnums.roles);
    if (!role || !assetRoles.includes(role)) {
      throw new Error(`type parameter must be one of ${assetRoles}`);
    }
  }

  return class Asset extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #type;
    #role;
    #url;
    #remoteId;

    constructor({
      id = commonDataGenerator.generateId(),
      type,
      role,
      url,
      remoteId,
      createdAt,
      updatedAt,
    } = {}) {
      commonDataValidator.validateId(id);
      validateType(type);
      validateRole(role);
      commonDataValidator.validateUrl(url);

      super();
      this.#id = id;
      this.#type = type;
      this.#role = role;
      this.#url = url;
      this.#remoteId = remoteId;
      this.#createdAt = createdAt;
      this.#updatedAt = updatedAt;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set type(type) {
      validateType(type);
      this.#type = type;
      this.#updatedAt = Date.now();
    }

    get type() {
      return this.#type;
    }

    set role(role) {
      validateRole(role);
      this.#role = role;
      this.#updatedAt = Date.now();
    }

    get role() {
      return this.#role;
    }

    set url(url) {
      commonDataValidator.validateUrl(url);
      this.#url = url;
      this.#updatedAt = Date.now();
    }

    get url() {
      return this.#url;
    }

    set remoteId(remoteId) {
      this.#remoteId = remoteId;
      this.#updatedAt = Date.now();
    }

    get remoteId() {
      return this.#remoteId;
    }

    toJSON() {
      return {
        id: this.#id,
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        type: this.#type,
        role: this.#role,
        url: this.#url,
        remoteId: this.#remoteId,
      };
    }
  };
};
