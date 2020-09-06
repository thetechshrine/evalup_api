const studentAcademicYearEnums = require('../enums/student-academic-year');

module.exports = function buildStudentAcademicYear({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validateDatesConformity(startDate, endDate) {
    if (!startDate || new Date(startDate) >= new Date(endDate)) {
      throw new Error('Start parameter is invalid or is later than end date');
    }
  }

  function validateStatus(status) {
    const statuses = Object.values(studentAcademicYearEnums.statuses);
    if (!status || !statuses.includes(status)) {
      throw new Error(`Status must be one of [${statuses}]`);
    }
  }

  return class StudentAcademicYear {
    #id;
    #startDate;
    #endDate;
    #active;
    #status;
    #studentId;
    #groupId;

    constructor({ startDate, endDate, active, studentId, groupId } = {}) {
      commonDataValidator.validateDate(startDate);
      commonDataValidator.validateDate(endDate);
      validateDatesConformity(startDate, endDate);
      commonDataValidator.validateId(studentId);
      commonDataValidator.validateId(groupId);

      this.#id = commonDataGenerator.generateId();
      this.#startDate = startDate;
      this.#endDate = endDate;
      this.#active = active;
      this.#status = studentAcademicYearEnums.status.ON_GOING;
      this.#studentId = studentId;
      this.#groupId = groupId;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set startDate(startDate) {
      validateDatesConformity(startDate, this.#endDate);
      this.#startDate = startDate;
    }

    get startDate() {
      return this.#startDate;
    }

    set endDate(endDate) {
      validateDatesConformity(this.#startDate, endDate);
      this.#endDate = endDate;
    }

    get endDate() {
      return this.#endDate;
    }

    set active(active) {
      this.#active = active;
    }

    get active() {
      return this.#active;
    }

    set status(status) {
      validateStatus(status);
      this.#status = status;
    }

    get status() {
      return this.#status;
    }

    set studentId(studentId) {
      commonDataValidator.validateId(studentId);
      this.#studentId = studentId;
    }

    get studentId() {
      return this.#studentId;
    }

    set groupId(groupId) {
      commonDataValidator.validateId(groupId);
      this.#groupId = groupId;
    }

    get groupId() {
      return this.#groupId;
    }

    toJSON() {
      return {
        id: this.#id,
        startDate: this.#startDate,
        endDate: this.#endDate,
        active: this.#active,
        status: this.#status,
      };
    }
  };
};
