const HttpResponse = require('../application/payloads/http-response');
const buildCreateCourseUseCase = require('../use_cases/administrator/create-course');
const buildGetCoursesUseCase = require('../use_cases/administrator/get-courses');

module.exports = function buildGroupController(dependencies) {
  const createCourseUseCase = buildCreateCourseUseCase(dependencies);
  const getCoursesUseCase = buildGetCoursesUseCase(dependencies);

  async function createCourse(request) {
    const course = await createCourseUseCase.execute({
      ...request.body,
      ...request.params,
      ...request.query,
    });

    return HttpResponse.created({
      message: 'Course successfully created',
      data: course,
    });
  }

  async function getCourses(request) {
    const courses = await getCoursesUseCase.execute(request.params);

    return HttpResponse.succeeded({
      data: courses,
    });
  }

  return {
    createCourse,
    getCourses,
  };
};
