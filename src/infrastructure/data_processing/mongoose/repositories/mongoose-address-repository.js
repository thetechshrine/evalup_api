const AddressRespository = require('../../../../database/repositories/address-repository');
const { Address } = require('../../../../database/entities');
const { AddressModel } = require('../models');

module.exports = class MongooseAddressRepository extends AddressRespository {
  async create(addressObject) {
    const address = new AddressModel(addressObject.toJSON());
    await address.save();

    return new Address(address);
  }

  async delete(addressId) {
    await AddressModel.deleteOne({ id: addressId });
  }
};
