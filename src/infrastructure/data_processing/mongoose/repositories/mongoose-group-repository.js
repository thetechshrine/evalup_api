const GroupRespository = require('../../../../database/repositories/group-repository');
const { Group } = require('../../../../database/entities');
const { GroupModel } = require('../models');

module.exports = class MongooseGroupRepository extends GroupRespository {
  async create(groupObject) {
    const group = new GroupModel(groupObject.toJSON());
    await group.save();

    return new Group(group);
  }

  async findById(groupId) {
    const group = await GroupModel.findOne({ id: groupId });
    return group ? new Group(group) : null;
  }

  async findByCode(groupCode) {
    const group = await GroupModel.findOne({ code: groupCode });
    return group ? new Group(group) : null;
  }
};
