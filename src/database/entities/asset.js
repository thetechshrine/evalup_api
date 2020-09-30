const TimeEntity = require('../../application/helpers/time-entity');
const assetEnums = require('../enums/asset');
const entityValidator = require('../../application/helpers/entity-validator');

module.exports = function buildAsset({ commonDataGenerator, commonDataValidator }) {
  function validateType(type) {
    const assetTypes = Object.values(assetEnums.types);

    commonDataValidator.validateEnumAsRequired(type, assetTypes, 'Asset type');
  }

  function validateRole(role) {
    const assetRoles = Object.values(assetEnums.roles);

    commonDataValidator.validateEnumAsRequired(role, assetRoles, 'Asset role');
  }

  function validateTargetResource(targetResource) {
    const targetResources = Object.values(assetEnums.targetResources);

    commonDataValidator.validateEnumAsRequired(targetResource, targetResources, 'Asset targetResource');
  }

  function validateRemoteId(remoteId) {
    commonDataValidator.validateStringAsRequired(remoteId, 'Asset remoteId');
  }

  function validateUrl(url) {
    commonDataValidator.validateUrlAsRequired(url, 'Asset url');
  }

  function validateName(name) {
    commonDataValidator.validateStringAsRequired(name, 'Asset name');
  }

  function validateAssessment(assessment, required = false) {
    entityValidator.validateAssessment({ assessment, required, errorPrefix: 'Asset assessment' });
  }

  function validateAssessmentResult(assessmentResult, required = false) {
    entityValidator.validateAssessmentResult({ assessmentResult, required, errorPrefix: 'Asset assessment result' });
  }

  return class Asset extends TimeEntity {
    #id;
    #createdAt;
    #updatedAt;
    #name;
    #type;
    #role;
    #targetResource;
    #url;
    #remoteId;
    #assessment;
    #assessmentResult;

    constructor({ id, name = 'Ressource', type, role, targetResource, url, remoteId, assessment, assessmentResult, createdAt, updatedAt } = {}) {
      super();

      commonDataValidator.validateIdAsRequired(id, 'Asset id');
      validateType(type);
      validateRole(role);
      validateName(name);
      validateTargetResource(targetResource);
      validateRemoteId(remoteId);
      validateUrl(url);
      validateAssessment(assessment);
      validateAssessmentResult(assessmentResult);
      commonDataValidator.validateDateAsRequired(createdAt, 'Asset createdAt');
      commonDataValidator.validateDateAsRequired(updatedAt, 'Asset updatedAt');

      this.#id = id;
      this.#type = type;
      this.#role = role;
      this.#name = name;
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

    set name(name) {
      validateType(name);
      this.#name = name;
      this.#updatedAt = Date.now();
    }

    get name() {
      return this.#name;
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
      validateUrl(url);
      this.#url = url;
      this.#updatedAt = Date.now();
    }

    get url() {
      return this.#url;
    }

    set remoteId(remoteId) {
      validateRemoteId(remoteId);
      this.#remoteId = remoteId;
      this.#updatedAt = Date.now();
    }

    get remoteId() {
      return this.#remoteId;
    }

    set assessment(assessment) {
      validateAssessment(assessment, true);
      this.#assessment = assessment;
      this.#updatedAt = Date.now();
    }

    get assessment() {
      return this.#assessment;
    }

    set assessmentResult(assessmentResult) {
      validateAssessmentResult(assessmentResult, true);
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
        name: this.#name,
        type: this.#type,
        role: this.#role,
        targetResource: this.#targetResource,
        url: this.#url,
        remoteId: this.#remoteId,
      };
    }

    static newInstance({
      id = commonDataGenerator.generateId(),
      name,
      type,
      role,
      targetResource,
      url,
      remoteId,
      assessment,
      assessmentResult,
      createdAt = Date.now(),
      updatedAt = Date.now(),
    } = {}) {
      return new Asset({
        id,
        name,
        type,
        role,
        targetResource,
        url,
        remoteId,
        assessment,
        assessmentResult,
        createdAt,
        updatedAt,
      });
    }
  };
};
