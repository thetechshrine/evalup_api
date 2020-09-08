const { expect } = require('chai');
const { Teacher, Account } = require('../../src/database/entities');
const {
  TeacherFactory,
  AccountFactory,
} = require('../../src/database/factories');

describe('create teacher entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.teacher = TeacherFactory.generate();
    shared.account = AccountFactory.generate();
  });

  it('should return an error if there is no type parameter', () => {
    delete shared.teacher.type;

    expect(() => {
      new Teacher(shared.teacher);
    }).to.throw();
  });

  it('should throw an error if type parameter is not valid', () => {
    shared.teacher.type = 'type';

    expect(() => {
      new Teacher(shared.teacher);
    }).to.throw();
  });

  it('should return an error if account parameter is not an instance of Account class', () => {
    shared.teacher.account = {};

    expect(() => {
      new Teacher(shared.teacher);
    }).to.throw();
  });

  it('should successfully create a teacher with an account', () => {
    shared.teacher.account = new Account(shared.account);
    const teacher = new Teacher(shared.teacher);

    expect(teacher).to.have.property('id');
  });
});
