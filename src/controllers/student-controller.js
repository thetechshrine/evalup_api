const HttpResponse = require('../application/payloads/http-response');
const buildCreateStudentUseCase = require('../use_cases/administrator/create-student');
const buildGetStudentsUseCase = require('../use_cases/administrator/get-students');

module.exports = function buildStudentController(dependencies) {
  const createStudentUseCase = buildCreateStudentUseCase(dependencies);
  const getStudentsUseCase = buildGetStudentsUseCase(dependencies);

  async function createStudent(request) {
    const student = await createStudentUseCase.execute({
      ...request.body,
      ...request.query,
    });

    return HttpResponse.created({
      message: 'Student account successfully created',
      data: student,
    });
  }

  async function getStudents() {
    const students = await getStudentsUseCase.execute();

    return HttpResponse.succeeded({
      data: students,
    });
  }

  return {
    createStudent,
    getStudents,
  };
};
