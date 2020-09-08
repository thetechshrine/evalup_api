const TimeEntity = require('../../application/helpers/time-entity');
const assetEnums = require('../enums/asset');
const entityValidator = require('../../application/helpers/entity-validator');

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

  function validateTargetResource(targetResource) {
    const targetResources = Object.values(assetEnums.targetResources);
    if (!targetResource || !targetResources.includes(targetResource)) {
      throw new Error(
        `target resource parameter must be one of ${targetResources}`
      );
    }
  }

  return class Asset extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #type;
    #role;
    #targetResource;
    #url;
    #remoteId;
    #assessment;
    #assessmentResult;

    constructor({
      id = commonDataGenerator.generateId(),
      type,
      role,
      targetResource,
      url,
      remoteId,
      assessment,
      assessmentResult,
      createdAt,
      updatedAt,
    } = {}) {
      commonDataValidator.validateId(id);
      validateType(type);
      validateRole(role);
      validateTargetResource(targetResource);
      commonDataValidator.validateUrl(url);
      entityValidator.validateAssessment({ assessment });
      entityValidator.validateAssessmentResult({ assessmentResult });

      super();
      this.#id = id;
      this.#type = type;
      this.#role = role;
      this.#targetResource = targetResource;
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

    set targetResource(targetResource) {
      validateTargetResource(targetResource);
      this.#targetResource = targetResource;
      this.#updatedAt = Date.now();
    }

    get targetResource() {
      return this.#targetResource;
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

    set assessment(assessment) {
      entityValidator.validateAssessment({ assessment, required: true });
      this.#assessment = assessment;
      this.#updatedAt = Date.now();
    }

    get assessment() {
      return this.#assessment;
    }

    set assessmentResult(assessmentResult) {
      entityValidator.validateAssessmentResult({
        assessmentResult,
        required: true,
      });
      this.#assessmentResult = assessmentResult;
      this.#updatedAt = Date.now();
    }

    get assessmentResult() {
      return this.#assessmentResult;
    }

    toJSON() {
      return {
        id: this.#id,
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        type: this.#type,
        role: this.#role,
        targetResource: this.#targetResource,
        url: this.#url,
        remoteId: this.#remoteId,
      };
    }
  };
};
