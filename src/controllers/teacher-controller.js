const HttpResponse = require('../application/payloads/http-response');
const buildCreateTeacherUseCase = require('../use_cases/administrator/create-teacher');
const buildGetTeachersUseCase = require('../use_cases/administrator/get-teachers');

module.exports = function buildTeacherController(dependencies) {
  const createTeacherUseCase = buildCreateTeacherUseCase(dependencies);
  const getTeachersUseCase = buildGetTeachersUseCase(dependencies);

  async function createTeacher(request) {
    const teacher = await createTeacherUseCase.execute(request.body);

    return HttpResponse.created({
      message: 'Teacher account successfully created',
      data: teacher,
    });
  }

  async function getTeachers() {
    const teachers = await getTeachersUseCase.execute();

    return HttpResponse.succeeded({
      data: teachers,
    });
  }

  return {
    createTeacher,
    getTeachers,
  };
};
