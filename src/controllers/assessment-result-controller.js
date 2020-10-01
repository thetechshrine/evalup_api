const HttpResponse = require('../application/payloads/http-response');
const accountEnums = require('../database/enums/account');
const controllerUtils = require('../application/helpers/controller-utils');
const buildCreateAssessmentResultUseCase = require('../use_cases/student/create-assessment-result');
const buildGetAssessmentResultsForAdministratorUseCase = require('../use_cases/administrator/get-assessment-results');
const buildGetAssessmentResultsForStudentUseCase = require('../use_cases/student/get-assessment-results');
const buildGetAssessmentResultsForTeacherUseCase = require('../use_cases/teacher/get-assessment-results');
const buildNoteAssessmentResultUseCase = require('../use_cases/teacher/note-assessment-result');

module.exports = function buildAssessmentResultController(dependencies) {
  const createAssessmentResultUseCase = buildCreateAssessmentResultUseCase(dependencies);
  const getAssessmentResultsForAdministratorUseCase = buildGetAssessmentResultsForAdministratorUseCase(dependencies);
  const getAssessmentResultsForStudentUseCase = buildGetAssessmentResultsForStudentUseCase(dependencies);
  const getAssessmentResultsForTeacherUseCase = buildGetAssessmentResultsForTeacherUseCase(dependencies);
  const noteAssessmentResultUseCase = buildNoteAssessmentResultUseCase(dependencies);

  async function createAssessmentResult(request) {
    const assessmentResult = await createAssessmentResultUseCase.execute({
      ...request.body,
      ...request.params,
      ...request.query,
    });

    return HttpResponse.created({
      message: 'Assessment result successfully created',
      data: assessmentResult,
    });
  }

  function extractGetAssessmentResultsCallback(request) {
    const accountRolesEnum = accountEnums.roles;

    return {
      [accountRolesEnum.ADMINISTRATOR]: getAssessmentResultsForAdministratorUseCase,
      [accountRolesEnum.STUDENT]: getAssessmentResultsForStudentUseCase,
      [accountRolesEnum.TEACHER]: getAssessmentResultsForTeacherUseCase,
    }[request.user.role];
  }

  async function getAssessmentResults(request) {
    const getAssessmentReultsCallback = extractGetAssessmentResultsCallback(request);
    const assessmentResults = await getAssessmentReultsCallback.execute({
      ...request.query,
      ...request.params,
    });

    return HttpResponse.succeeded({
      data: assessmentResults,
    });
  }

  async function noteAssessmentResult(request) {
    const assessmentResult = await noteAssessmentResultUseCase.execute({ ...request.params, ...request.body });

    return HttpResponse.succeeded({
      message: 'Assessment result successfully updated',
      data: assessmentResult,
    });
  }

  return {
    createAssessmentResult,
    getAssessmentResults,
    noteAssessmentResult,
  };
};
