module.exports = function buildAddress({ commonDataGenerator }) {
  function validateAddressInformation(
    streetNumber,
    streetName,
    city,
    zipCode,
    country
  ) {
    if (!streetNumber || streetNumber <= 0) {
      throw new Error(`Invalid street number ${streetNumber}`);
    }

    if (!streetName) {
      throw new Error('Street name parameter is required');
    }

    if (!city) {
      throw new Error('City parameter is required');
    }

    if (!zipCode) {
      throw new Error('Zip code parameter is required');
    }

    if (!country) {
      throw new Error('Country parameter is required');
    }
  }

  return class Address {
    constructor({ streetNumber, streetName, city, zipCode, country } = {}) {
      validateAddressInformation(
        streetNumber,
        streetName,
        city,
        zipCode,
        country
      );

      this.id = commonDataGenerator.generateId();
      this.streetNumber = streetNumber;
      this.streetName = streetName;
      this.city = city;
      this.zipCode = zipCode;
      this.country = country;
    }
  };
};
