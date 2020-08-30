const { expect } = require('chai');
const { Course, Group } = require('../../src/database/entities');
const { CourseFactory, GroupFactory } = require('../../src/database/factories');

describe('create account entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.course = CourseFactory.generate({
      group: new Group(GroupFactory.generate()),
    });
  });

  it('should return an error if there is no code parameter', () => {
    delete shared.course.code;

    expect(() => {
      new Course(shared.course);
    }).to.throw();
  });

  it('should return an error if there is no title parameter', () => {
    delete shared.course.title;

    expect(() => {
      new Course(shared.course);
    }).to.throw();
  });

  it('should return an error if there is no credits parameter', () => {
    delete shared.course.credits;

    expect(() => {
      new Course(shared.course);
    }).to.throw();
  });

  it('should return an error if credits is less or equal 0', () => {
    shared.course.credits = 0;

    expect(() => {
      new Course(shared.course);
    }).to.throw();
  });

  it('should return an error if there is no success note parameter', () => {
    delete shared.course.successNote;

    expect(() => {
      new Course(shared.course);
    }).to.throw();
  });

  it('should return an error if success note is less or equal 0', () => {
    shared.course.successNote = 0;

    expect(() => {
      new Course(shared.course);
    }).to.throw();
  });
});
