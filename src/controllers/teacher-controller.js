const HttpResponse = require('../application/payloads/http-response');
const buildCreateTeacherUseCase = require('../use_cases/administrator/create-teacher');

module.exports = function buildTeacherController(dependencies) {
  const createTeacherUseCase = buildCreateTeacherUseCase(dependencies);

  async function createTeacher(request) {
    const teacher = await createTeacherUseCase.execute(request.body);

    const httpResponse = HttpResponse.created({
      message: 'Teacher account successfully created',
      data: teacher,
    });

    return httpResponse;
  }

  return {
    createTeacher,
  };
};
