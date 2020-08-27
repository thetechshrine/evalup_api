const { expect } = require('chai');
const { PersonalInformation } = require('../../src/database/entities');
const { PersonalInformationFactory } = require('../../src/database/factories');
const commonEnums = require('../../src/database/enums/common');

describe('create personal information entity (abstract)', () => {
  it('should return an error if no arguments are passed', () => {
    expect(() => {
      new PersonalInformation();
    }).to.throw();
  });

  it('should return an error if the gender is not valid', () => {
    expect(() => {
      new PersonalInformation(
        PersonalInformationFactory.generate({
          gender: 'gender',
          phone: PersonalInformationFactory.getValidPhoneSample(),
        })
      );
    }).to.throw(
      `Gender must be one of [${Object.values(commonEnums.genders)}]`
    );
  });

  it('should return an error if the lastname is less than 3 characters', () => {
    expect(() => {
      new PersonalInformation(
        PersonalInformationFactory.generate({
          lastName: 'or',
          phone: PersonalInformationFactory.getValidPhoneSample(),
        })
      );
    }).to.throw();
  });

  it('should return an error if the firstname is less than 3 characters', () => {
    expect(() => {
      new PersonalInformation(
        PersonalInformationFactory.generate({
          firstName: 'or',
          phone: PersonalInformationFactory.getValidPhoneSample(),
        })
      );
    }).to.throw();
  });

  it('should return an error if the phone is invalid', () => {
    expect(() => {
      new PersonalInformation(PersonalInformationFactory.generate());
    }).to.throw();
  });

  it('should return an error if the birth date is not a valid date', () => {
    expect(() => {
      new PersonalInformation(
        PersonalInformationFactory.generate({
          phone: PersonalInformationFactory.getValidPhoneSample(),
          birthDate: 'birthDate',
        })
      );
    }).to.throw();
  });

  it('should successfully instantiate a new personal information if all properties are valid', (done) => {
    new PersonalInformation(
      PersonalInformationFactory.generate({
        phone: PersonalInformationFactory.getValidPhoneSample(),
      })
    );
    done();
  });
});
