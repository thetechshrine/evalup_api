const { expect } = require('chai');
const { Group } = require('../../src/database/entities');
const { GroupFactory } = require('../../src/database/factories');

describe('create group entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.group = GroupFactory.generate();
  });

  it('should return an error if there is no code parameter', () => {
    delete shared.group.code;

    expect(() => {
      new Group(shared.group);
    }).to.throw();
  });

  it('should successfully create a group if all properties are valid', () => {
    const group = new Group(shared.group);

    expect(group).to.have.property('id');
  });
});
