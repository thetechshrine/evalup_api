const HttpResponse = require('../application/payloads/http-response');
const buildCreateCourseUseCase = require('../use_cases/administrator/create-course');

module.exports = function buildGroupController(dependencies) {
  const createCourseUseCase = buildCreateCourseUseCase(dependencies);

  async function createCourse(request) {
    const course = await createCourseUseCase.execute({
      ...request.body,
      ...request.params,
      ...request.query,
    });

    const httpResponse = HttpResponse.created({
      message: 'Course successfully created',
      data: course,
    });

    return httpResponse;
  }

  return {
    createCourse,
  };
};
