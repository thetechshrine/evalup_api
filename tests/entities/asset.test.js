const { expect } = require('chai');
const { Asset } = require('../../src/database/entities');
const { AssetFactory } = require('../../src/database/factories');

describe('create asset entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.asset = AssetFactory.generate();
  });

  it('should return an error if there is no type parameter', () => {
    delete shared.asset.type;

    expect(() => {
      new Asset(shared.asset);
    }).to.throw();
  });

  it('should return an error if type is not valid', () => {
    shared.asset.type = 'type';

    expect(() => {
      new Asset(shared.asset);
    }).to.throw();
  });

  it('should return an error if there is no role parameter', () => {
    delete shared.asset.role;

    expect(() => {
      new Asset(shared.asset);
    }).to.throw();
  });

  it('should return an error if role is not valid', () => {
    shared.asset.role = 'role';

    expect(() => {
      new Asset(shared.asset);
    }).to.throw();
  });

  it('should return an error if url is not valid', () => {
    shared.asset.url = 'url';

    expect(() => {
      new Asset(shared.asset);
    }).to.throw();
  });

  it('should successfully create an asset if all properties are valid', () => {
    const asset = new Asset(shared.asset);
    expect(asset).to.have.property('id');
  });
});
