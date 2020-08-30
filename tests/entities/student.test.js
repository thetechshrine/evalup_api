const { expect } = require('chai');
const { Student, PersonalInformation } = require('../../src/database/entities');
const {
  StudentFactory,
  PersonalInformationFactory,
} = require('../../src/database/factories');

describe('create student entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.student = StudentFactory.generate({
      personalInformation: new PersonalInformation(
        PersonalInformationFactory.generate({
          phone: PersonalInformationFactory.getValidPhoneSample(),
        })
      ),
    });
  });

  it('should return an error if there is no nationality parameter', () => {
    delete shared.student.nationality;

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should throw an error if personal information parameter is not valid', () => {
    shared.student.personalInformation = {};

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should throw an error if address id parameter is not valid', () => {
    shared.student.addressId = '';

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should throw an error if account id parameter is not valid', () => {
    shared.student.accountId = '';

    expect(() => {
      new Student(shared.student);
    }).to.throw();
  });

  it('should successfully create a student with all valid properties', () => {
    const student = new Student(shared.student);
    expect(student).to.have.property('id');
  });
});
