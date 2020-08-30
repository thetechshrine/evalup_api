const studentEnums = require('../enums/student');
const commonEnums = require('../enums/common');

module.exports = function buildStudent({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateNationality(nationality) {
    const countriesCodes = Object.keys(studentEnums.countries);
    if (!nationality || !countriesCodes.includes(nationality))
      throw new Error(`Invalid nationality ${nationality}`);
  }

  function validatePersonalInformation(personalInfomation) {
    if (
      !personalInfomation ||
      personalInfomation.constructor.name !==
        commonEnums.entitiesClassNames.PERSONAL_INFORMATION
    ) {
      throw new Error(
        'Personal information parameter must be an instance of PersonalInformation class'
      );
    }
  }

  return class Student {
    #id;
    #nationality;
    #personalInformation;
    #addressId;
    #accountId;

    constructor({ nationality, personalInformation, addressId, accountId }) {
      validateNationality(nationality);
      validatePersonalInformation(personalInformation);
      commonDataValidator.validateId(addressId);
      commonDataValidator.validateId(accountId);

      this.#id = commonDataGenerator.generateId();
      this.#nationality = nationality;
      this.#personalInformation = personalInformation;
      this.#addressId = addressId;
      this.#accountId = accountId;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set nationality(nationality) {
      validateNationality(nationality);
      this.#nationality = nationality;
    }

    get nationality() {
      return this.#nationality;
    }

    set personalInformation(personalInformation) {
      validatePersonalInformation(personalInformation);
      this.#personalInformation = personalInformation;
    }

    get personalInformation() {
      return this.#personalInformation;
    }

    set addressId(addressId) {
      commonDataValidator.validateId(addressId);
      this.#addressId = addressId;
    }

    get addressId() {
      return this.#addressId;
    }

    set accountId(accountId) {
      commonDataValidator.validateId(accountId);
      this.#accountId = accountId;
    }

    get accountId() {
      return this.#accountId;
    }

    toJSON() {
      return {
        id: this.#id,
        nationality: this.#nationality,
        personalInformation: this.#personalInformation.toJSON(),
      };
    }
  };
};
