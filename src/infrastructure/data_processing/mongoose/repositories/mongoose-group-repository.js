const GroupRespository = require('../../../../database/repositories/group-repository');
const { Group } = require('../../../../database/entities');
const { GroupModel } = require('../models');
const { ResourceNotFoundError, ParameterError, BadRequestError } = require('../../../../application/helpers/errors');
const defaultSortingParams = require('../utils/default-sorting-params');

module.exports = class MongooseGroupRepository extends GroupRespository {
  async create(groupObject) {
    const group = new GroupModel(groupObject.toJSON());
    await group.save();

    return new Group(group);
  }

  async checkById(id) {
    if (!id) throw new ParameterError('groupId parameter is mandatory');

    const matchingGroupsCount = await GroupModel.countDocuments({ id });
    if (matchingGroupsCount !== 1) throw new ResourceNotFoundError(`Group with id ${id} not was found`);
  }

  async parseToGroupEntity(group) {
    return new Group(group);
  }

  async findById(id) {
    await this.checkById(id);

    const foundGroup = await GroupModel.findOne({ id });

    return this.parseToGroupEntity(foundGroup);
  }

  async findAll() {
    const foundGroups = await GroupModel.find().sort(defaultSortingParams);
    const parseToGroupEntityPromises = foundGroups.map((foundGroup) => this.parseToGroupEntity(foundGroup));

    return Promise.all(parseToGroupEntityPromises);
  }

  async ensureThereIsNoGroupRelatedToTheProvidedCode(code) {
    const foundGroup = await GroupModel.findOne({ code });
    if (foundGroup) throw new BadRequestError(`Code ${code} is already associated to a group`);
  }
};
