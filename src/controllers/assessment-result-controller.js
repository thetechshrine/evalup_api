const HttpResponse = require('../application/payloads/http-response');
const buildCreateAssessmentResultUseCase = require('../use_cases/student/create-assessment-result');

module.exports = function buildAssessmentResultController(dependencies) {
  const createAssessmentResultUseCase = buildCreateAssessmentResultUseCase(
    dependencies
  );

  async function createAssessmentResult(request) {
    const assessmentResult = await createAssessmentResultUseCase.execute({
      ...request.body,
      ...request.params,
      ...request.query,
    });

    const httpResponse = HttpResponse.created({
      message: 'Assessment result successfully created',
      data: assessmentResult,
    });

    return httpResponse;
  }

  return {
    createAssessmentResult,
  };
};
