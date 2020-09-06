module.exports = function buildAddress({ commonDataGenerator }) {
  function validateStreetNumber(streetNumber) {
    if (!streetNumber || streetNumber <= 0) {
      throw new Error(`Invalid street number ${streetNumber}`);
    }
  }

  function validateStreetName(streetName) {
    if (!streetName) {
      throw new Error('Street name parameter is required');
    }
  }

  function validateCity(city) {
    if (!city) {
      throw new Error('City parameter is required');
    }
  }

  function validateZipCode(zipCode) {
    if (!zipCode) {
      throw new Error('Zip code parameter is required');
    }
  }

  function validateCountry(country) {
    if (!country) {
      throw new Error('Country parameter is required');
    }
  }

  return class Address {
    #id;
    #streetNumber;
    #streetName;
    #city;
    #zipCode;
    #country;

    constructor({ streetNumber, streetName, city, zipCode, country } = {}) {
      validateStreetNumber(streetNumber);
      validateStreetName(streetName);
      validateCity(city);
      validateZipCode(zipCode);
      validateCountry(country);

      this.#id = commonDataGenerator.generateId();
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
