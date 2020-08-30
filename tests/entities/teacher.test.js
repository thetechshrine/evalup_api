const { expect } = require('chai');
const { Teacher, PersonalInformation } = require('../../src/database/entities');
const {
  TeacherFactory,
  PersonalInformationFactory,
} = require('../../src/database/factories');

describe('create teacher entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.teacher = TeacherFactory.generate({
      personalInformation: new PersonalInformation(
        PersonalInformationFactory.generate({
          phone: PersonalInformationFactory.getValidPhoneSample(),
        })
      ),
    });
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

  it('should return an error if there is no personal information parameter', () => {
    delete shared.teacher.personalInformation;

    expect(() => {
      new Teacher(shared.teacher);
    }).to.throw();
  });

  it('should throw an error if address id parameter is not valid', () => {
    shared.teacher.addressId = '';

    expect(() => {
      new Teacher(shared.teacher);
    }).to.throw();
  });

  it('should throw an error if account id parameter is not valid', () => {
    shared.teacher.accountId = '';

    expect(() => {
      new Teacher(shared.teacher);
    }).to.throw();
  });

  it('should successfully create a teacher with all valid properties', () => {
    const teacher = new Teacher(shared.teacher);
    expect(teacher).to.have.property('id');
  });
});
