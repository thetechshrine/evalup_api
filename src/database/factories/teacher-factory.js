const teacherEnums = require('../enums/teacher');

module.exports = function buildTeacherFactory({ fakeDataGenerator }) {
  function pickARandomTeacherType() {
    const teacherTypes = Object.keys(teacherEnums.types);
    return teacherTypes[Math.floor(Math.random() * teacherTypes.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        type: pickARandomTeacherType(),
        addressId: fakeDataGenerator.generateId(),
        accountId: fakeDataGenerator.generateId(),
        ...initialValues,
      };
    },
  };
};
