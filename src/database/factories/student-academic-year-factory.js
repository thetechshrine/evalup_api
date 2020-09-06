module.exports = function buildStudentAcademicYearFactory() {
  return {
    generate(initialValues = {}) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setHours(startDate.getHours() + 9);

      return {
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        active: true,
        ...initialValues,
      };
    },
  };
};
