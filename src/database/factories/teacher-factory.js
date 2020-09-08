const teacherEnums = require('../enums/teacher');

module.exports = function buildTeacherFactory() {
  function pickARandomTeacherType() {
    const teacherTypes = Object.keys(teacherEnums.types);
    return teacherTypes[Math.floor(Math.random() * teacherTypes.length)];
  }

  return {
    generate(initialValues = {}) {
      return {
        type: pickARandomTeacherType(),
        ...initialValues,
      };
    },
  };
};
