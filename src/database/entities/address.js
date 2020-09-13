const {
  BadRequestError,
  ParameterError,
} = require('../../application/helpers/errors');

module.exports = function buildAddress({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateStreetNumber(streetNumber) {
    if (!streetNumber) {
      throw new ParameterError(`Address street number is required`);
    }
    if (!Number.isInteger(Number(streetNumber))) {
      throw new BadRequestError(
        `Address street number must be a numeric value`
      );
    }
    if (streetNumber <= 0) {
      throw new BadRequestError(
        `Address street number ${streetNumber} is invalid`
      );
    }
  }

  function validateStreetName(streetName) {
    if (!streetName) {
      throw new ParameterError('Address street name is required');
    }
  }

  function validateCity(city) {
    if (!city) {
      throw new ParameterError('Address city is required');
    }
  }

  function validateZipCode(zipCode) {
    if (!zipCode) {
      throw new ParameterError('Address zip code is required');
    }
  }

  function validateCountry(country) {
    if (!country) {
      throw new ParameterError('Address country is required');
    }
  }

  return class Address {
    #id;
    #streetNumber;
    #streetName;
    #city;
    #zipCode;
    #country;

    constructor({
      id = commonDataGenerator.generateId(),
      streetNumber,
      streetName,
      city,
      zipCode,
      country,
    } = {}) {
      commonDataValidator.validateId(id);
      validateStreetNumber(streetNumber);
      validateStreetName(streetName);
      validateCity(city);
      validateZipCode(zipCode);
      validateCountry(country);

      this.#id = id;
      this.#streetNumber = streetNumber;
      this.#streetName = streetName;
      this.#city = city;
      this.#zipCode = zipCode;
      this.#country = country;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set streetNumber(streetNumber) {
      validateStreetNumber(streetNumber);
      this.#streetNumber = streetNumber;
    }

    get streetNumber() {
      return this.#streetNumber;
    }

    set streetName(streetName) {
      validateStreetName(streetName);
      this.#streetName = streetName;
    }

    get streetName() {
      return this.#streetName;
    }

    set city(city) {
      validateCity(city);
      this.#city = city;
    }

    get city() {
      return this.#city;
    }

    set zipCode(zipCode) {
      validateZipCode(zipCode);
      this.#zipCode = zipCode;
    }

    get zipCode() {
      return this.#zipCode;
    }

    set country(country) {
      validateCountry(country);
      this.#country = country;
    }

    get country() {
      return this.#country;
    }

    toJSON() {
      return {
        id: this.#id,
        streetNumber: this.#streetNumber,
        streetName: this.#streetName,
        city: this.#city,
        zipCode: this.#zipCode,
        country: this.#country,
      };
    }
  };
};
