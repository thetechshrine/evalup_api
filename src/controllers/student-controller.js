const HttpResponse = require('../application/payloads/http-response');
const buildCreateStudentUseCase = require('../use_cases/administrator/create-student');

module.exports = function buildStudentController(dependencies) {
  const createStudentUseCase = buildCreateStudentUseCase(dependencies);

  async function createStudent(request) {
    const student = await createStudentUseCase.execute({
      ...request.body,
      ...request.query,
    });

    const httpResponse = HttpResponse.created({
      message: 'Student account successfully created',
      data: student,
    });

    return httpResponse;
  }

  return {
    createStudent,
  };
};
