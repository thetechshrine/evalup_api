const { expect } = require('chai');
const { Address } = require('../../src/database/entities');
const { AddressFactory } = require('../../src/database/factories');

describe('create address entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.address = AddressFactory.generate();
  });

  it('should return an error if there is no street number parameter', () => {
    delete shared.address.streetNumber;

    expect(() => {
      new Address(shared.address);
    }).to.throw();
  });

  it('should return an error if street number parameter is less or equal to 0', () => {
    shared.address.streetNumber = 0;

    expect(() => {
      new Address(shared.address);
    }).to.throw();
  });

  it('should return an error if there is no street name parameter', () => {
    delete shared.address.streetName;

    expect(() => {
      new Address(shared.address);
    }).to.throw();
  });

  it('should return an error if there is no city parameter', () => {
    delete shared.address.city;

    expect(() => {
      new Address(shared.address);
    }).to.throw();
  });

  it('should return an error if there is no zip code parameter', () => {
    delete shared.address.zipCode;

    expect(() => {
      new Address(shared.address);
    }).to.throw();
  });

  it('should return an error if there is no country parameter', () => {
    delete shared.address.country;

    expect(() => {
      new Address(shared.address);
    }).to.throw();
  });

  it('should successfully create a new address with an id', () => {
    const address = new Address(shared.address);

    expect(address).to.have.property('id');
  });
});
