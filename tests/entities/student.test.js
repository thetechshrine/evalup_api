const { expect } = require('chai');
const { Student } = require('../../src/database/entities');
const { StudentFactory } = require('../../src/database/factories');

describe('create student entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.student = StudentFactory.generate();
  });

  it('should return an error if there is no gender parameter', () => {
    delete shared.student.gender;

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should return an error if gender paramerter is incorrect', () => {
    shared.student.gender = 'gender';

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should return an error if there is no lastName parameter', () => {
    delete shared.student.lastName;

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });
  it('should return an error if there is no firstName parameter', () => {
    delete shared.student.firstName;

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should return an error if there is no nationality parameter', () => {
    delete shared.student.nationality;

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should return an error if there is no phone parameter', () => {
    delete shared.student.phone;

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should return an error if there is no birthDate parameter', () => {
    delete shared.student.birthDate;

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should return an error if account is not an instance of Account class', () => {
    shared.student.account = {};

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should return an error if address is not an instance of Address class', () => {
    shared.student.address = {};

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should return an error if group is not an instance of Group class', () => {
    shared.student.group = {};

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should successfully create a student with all valid properties', () => {
    const student = new Student(shared.student);

    expect(student).to.have.property('id');
  });
});
