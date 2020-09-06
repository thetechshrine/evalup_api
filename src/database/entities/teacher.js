const teacherEnums = require('../enums/teacher');
const commonEnums = require('../enums/common');

module.exports = function buildStudent({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validatetype(type) {
    const teacherTypes = Object.keys(teacherEnums.types);
    if (!type || !teacherTypes.includes(type))
      throw new Error(`Type must be one of ${teacherTypes}`);
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
    #type;
    #personalInformation;
    #addressId;
    #accountId;

    constructor({ type, personalInformation, addressId, accountId }) {
      validatetype(type);
      validatePersonalInformation(personalInformation);
      commonDataValidator.validateId(addressId);
      commonDataValidator.validateId(accountId);

      this.#id = commonDataGenerator.generateId();
      this.#type = type;
      this.#personalInformation = personalInformation;
      this.#addressId = addressId;
      this.#accountId = accountId;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set type(type) {
      validatetype(type);
      this.#type = type;
    }

    get type() {
      return this.#type;
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
        type: this.#type,
        personalInformation: this.#personalInformation.toJSON(),
      };
    }
  };
};
