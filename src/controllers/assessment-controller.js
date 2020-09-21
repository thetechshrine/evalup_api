const HttpResponse = require('../application/payloads/http-response');
const buildCreateAssessmentUseCase = require('../use_cases/administrator/create-assessment');

module.exports = function buildAssessmentController(dependencies) {
  const createAssessmentUseCase = buildCreateAssessmentUseCase(dependencies);

  async function createAssessment(request) {
    const assessment = await createAssessmentUseCase.execute({
      ...request.body,
      ...request.query,
    });

    const httpResponse = HttpResponse.created({
      message: 'Assessment successfully created',
      data: assessment,
    });

    return httpResponse;
  }

  return {
    createAssessment,
  };
};
