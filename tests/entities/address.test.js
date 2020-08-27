const { expect } = require('chai');
const { Address } = require('../../src/database/entities');
const { AddressFactory } = require('../../src/database/factories');

describe('create address entity', () => {
  it('should return an error if there is no street number parameter', () => {
    const address = AddressFactory.generate();
    delete address.streetNumber;

    expect(() => {
      new Address(address);
    }).to.throw();
  });

  it('should return an error if street number parameter is less or equal to 0', () => {
    const address = AddressFactory.generate({
      streetNumber: 0,
    });

    expect(() => {
      new Address(address);
    }).to.throw();
  });

  it('should return an error if there is no street name parameter', () => {
    const address = AddressFactory.generate();
    delete address.streetName;

    expect(() => {
      new Address(address);
    }).to.throw();
  });

  it('should return an error if there is no city parameter', () => {
    const address = AddressFactory.generate();
    delete address.city;

    expect(() => {
      new Address(address);
    }).to.throw();
  });

  it('should return an error if there is no zip code parameter', () => {
    const address = AddressFactory.generate();
    delete address.zipCode;

    expect(() => {
      new Address(address);
    }).to.throw();
  });

  it('should return an error if there is no country parameter', () => {
    const address = AddressFactory.generate();
    delete address.country;

    expect(() => {
      new Address(address);
    }).to.throw();
  });

  it('should successfully create a new address with an id', () => {
    const address = new Address(AddressFactory.generate());
    expect(address).to.have.property('id');
  });
});
