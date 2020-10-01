const HttpResponse = require('../application/payloads/http-response');
const accountEnums = require('../database/enums/account');
const controllerUtils = require('../application/helpers/controller-utils');
const buildCreateAssessmentUseCase = require('../use_cases/administrator/create-assessment');
const buildGetAssessmentsForAdministratorUseCase = require('../use_cases/administrator/get-assessments');
const buildGetAssessmentsForStudentUseCase = require('../use_cases/student/get-assessments');
const buildGetTodayAssessmentUseCase = require('../use_cases/student/get-today-assessment');
const buildGetAssessmentsForTeacherUseCase = require('../use_cases/teacher/get-assessments');
const buildMarkAssessmentResultsAsPublishedUseCase = require('../use_cases/teacher/mark-assessment-results-as-published');

module.exports = function buildAssessmentController(dependencies) {
  const createAssessmentUseCase = buildCreateAssessmentUseCase(dependencies);
  const getAssessmentsForAdministratorUseCase = buildGetAssessmentsForAdministratorUseCase(dependencies);
  const getAssessmentsForStudentUseCase = buildGetAssessmentsForStudentUseCase(dependencies);
  const getTodayAssessmentUseCase = buildGetTodayAssessmentUseCase(dependencies);
  const getAssessmentsForTeacherUseCase = buildGetAssessmentsForTeacherUseCase(dependencies);
  const markAssessmentResultsAsPublishedUseCase = buildMarkAssessmentResultsAsPublishedUseCase(dependencies);

  async function createAssessment(request) {
    const assessment = await createAssessmentUseCase.execute({
      ...request.body,
      ...request.query,
    });

    return HttpResponse.created({
      message: 'Assessment successfully created',
      data: assessment,
    });
  }

  function extractGetAssessmentsCallback(request) {
    const accountRolesEnum = accountEnums.roles;

    return {
      [accountRolesEnum.ADMINISTRATOR]: getAssessmentsForAdministratorUseCase,
      [accountRolesEnum.STUDENT]: getAssessmentsForStudentUseCase,
      [accountRolesEnum.TEACHER]: getAssessmentsForTeacherUseCase,
    }[request.user.role];
  }

  async function getAssessments(request) {
    const getAssessmentsCallback = extractGetAssessmentsCallback(request);
    const assessments = await getAssessmentsCallback.execute(request.query);

    return HttpResponse.succeeded({
      data: assessments,
    });
  }

  async function getTodayAssessement(request) {
    // controllerUtils.ensureUserIsAStudent(request);
    const assessment = await getTodayAssessmentUseCase.execute(request.query);

    return HttpResponse.succeeded({
      data: assessment,
    });
  }

  async function markAssessmentResultsAsPublished(request) {
    const assessmentResults = await markAssessmentResultsAsPublishedUseCase.execute(request.params);

    return HttpResponse.succeeded({
      message: 'Assessment results have been successfully updated',
      data: assessmentResults,
    });
  }

  return {
    createAssessment,
    getAssessments,
    getTodayAssessement,
    markAssessmentResultsAsPublished,
  };
};
