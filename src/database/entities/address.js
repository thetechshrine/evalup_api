const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildAddress({ commonDataGenerator, commonDataValidator }) {
  function validateStreetNumber(streetNumber) {
    commonDataValidator.validateNumberAsRequired(streetNumber, 'Address streetNumber');

    if (streetNumber <= 0) throw new BadRequestError(`Address streetNumber ${streetNumber} is invalid`);
  }

  function validateStreetName(streetName) {
    commonDataValidator.validateStringAsRequired(streetName, 'Address streetName');
  }

  function validateCity(city) {
    commonDataValidator.validateStringAsRequired(city, 'Address city');
  }

  function validateZipCode(zipCode) {
    commonDataValidator.validateStringAsRequired(zipCode, 'Address zipCode');
  }

  function validateCountry(country) {
    commonDataValidator.validateStringAsRequired(country, 'Address country');
  }

  return class Address {
    #id;
    #streetNumber;
    #streetName;
    #city;
    #zipCode;
    #country;

    constructor({ id, streetNumber, streetName, city, zipCode, country } = {}) {
      commonDataValidator.validateIdAsRequired(id);
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

    static newInstance({ id = commonDataGenerator.generateId(), streetNumber, streetName, city, zipCode, country } = {}) {
      return new Address({ id, streetNumber, streetName, city, zipCode, country });
    }
  };
};
